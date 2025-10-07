# تصميم معماري لمنصة توصيل متعددة المتاجر

## 1 — نظرة عامة للمنتج / القيمة

منصة تجمع متاجر عديدة (متاجر تجزئة/مطاعم/سلاسل محلية) وتوفّر:

- إدارة طلبات مركزيّة وتوجيه توصيل ذكي لكل متجر.
- لوحة تحكم لكل متجر + لوحة مركزية لإدارة المنصة.
- تسوية مالية/عمولات، إدارة عائدات، وتكامل شحن/دفع.
- دعم أوقات تجهيز متباينة لكل متجر، سياسات إرجاع، ومستويات مخزون متزامنة.
- قابلية التوسع لاستيعاب آلاف المتاجر ومليونات الطلبات.

## 2 — قرارات مصممة (Architecture Decisions)

1.  **نموذج تعدد المستأجرين (Multi-tenant):** استخدم نموذج pooled schema (قاعدة بيانات مشتركة مع `tenant_id` في الجداول) للـMVP، واجعل التصميم قابلاً للتحويل إلى isolated schema لمتاجر ذات متطلبات خصوصية/أداء عالية.
2.  **إرسال/مراسلة في الوقت الحقيقي:** استعمال Kafka/Pulsar لتيار الأحداث، وWebSockets/Socket.IO للـUI الفوري.
3.  **خدمات صغيرة (Microservices):** فصل الخدمات الأساسية — Orders, Routing, Inventory, Payments, Settlement, Notifications, Drivers — لكل خدمة قابلية للتوسع مستقلة.
4.  **Model Serving & MLOps:** نماذج ETA وRouting تخدم عبر Triton/KFServing، وAX for monitoring.
5.  **Gateway API & BFFs:** API Gateway + Backend-for-Frontend لكل تطبيق (Store App, Driver App, Admin Portal).
6.  **التوثيق والأمان:** OAuth2 / OpenID Connect + role-based access + per-tenant RBAC.
7.  **Observability:** Metrics (Prometheus), Traces (Jaeger), Logs (ELK).

## 3 — المميزات الأساسية والمطلوبة خصيصًا لـMulti-Store

A. **Onboarding & Catalog**
   - واجهة onboarding مخصصة لكل متجر (متجر مستقل/فرع).
   - استيراد الكتالوج عبر CSV أو API (SKU, weight, dimensions, prep_time, temperature_class).
   - إعداد سياسات التسليم per-store: مناطق التوصيل، رسوم، ساعات العمل، أوقات التحضير.

B. **Inventory Sync & Availability**
   - مخزون مركزي/محلي لكل فرع (`location_id`).
   - Webhooks وdelta sync للتكامل مع POS المتجر (push/pull).
   - دعم حظر عناصر (unavailable) تلقائيًا عند نفاد الكمية.

C. **Order Routing & Fulfillment**
   - خيارين للتوجيه: Store-fulfilled (المتجر يحزم ويسلّم للسائق) وHub-fulfilled (مركز لوجستي).
   - دعم Partial fulfillment (جزء من الطلب من فرع آخر أو تجربة split fulfillment).
   - احترام `prep_time` و`cutoff_time` لكل متجر أثناء توجيه الطلب.

D. **Multi-Store Batching & Consolidation**
   - جمع طلبات قريبة من متاجر مختلفة في رحلة واحدة (multi-stop).
   - قواعد الباتش: وزن، حجم، نافذة تسليم، SLA، واحتياجات تبريد.

E. **Settlement & Commission**
   - سياسات عمولات متغيرة (٪ ثابت أو شريحة حسب المبيعات).
   - تقارير تسوية يومية/أسبوعية، معاملات دفع/استرداد (refunds) لكل متجر.
   - دعم متعدّد بوابات دفع وربطها بسياسات رسوم المتجر.

F. **SLA, ETA وCustomer Experience**
   - ETA محلي مخصص لكل متجر + إعادة حساب ديناميكي عند التأخير.
   - قناة تواصل متجّهة (SMS, Push, WhatsApp) مع قوالب خاصة بكل متجر.

G. **Insights & Store Dashboards**
   - لوحة متجر: مبيعات، أداء التسليم، متوسط وقت التحضير، نزاعات، تقييمات.
   - لوحة منصة: توزيع الطلبات، تحميل أسطول، حصة كل متجر.

H. **Ops & Admin**
   - إدارة مناطق التوصيل (geofencing) per-store.
   - Feature flags per-store لتفعيل/إيقاف ميزات (مثلاً: same-day delivery).

## 4 — نموذج بيانات مقترح (مقتطف)

```sql
-- أمثلة حقول رئيسية — ننفذ كـ pooled schema

CREATE TABLE stores (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  tenant_id UUID,
  name TEXT NOT NULL,
  address TEXT,
  timezone TEXT,
  commission_rate REAL,
  is_active BOOLEAN DEFAULT TRUE,
  prep_time_default INTERVAL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE store_locations (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  store_id BIGINT REFERENCES stores(id),
  name TEXT,
  lat REAL,
  lon REAL,
  capacity REAL,
  temperature_class TEXT
);

CREATE TABLE products (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  store_id BIGINT REFERENCES stores(id),
  sku TEXT,
  name TEXT NOT NULL,
  price REAL,
  weight REAL,
  dimensions TEXT,
  stock_qty INTEGER,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE orders (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  tenant_id UUID,
  store_id BIGINT REFERENCES stores(id),
  location_id BIGINT REFERENCES store_locations(id),
  customer_id BIGINT,
  total_amount REAL,
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  scheduled_at TIMESTAMPTZ,
  fulfillment_type TEXT
);

CREATE TABLE order_items (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  order_id BIGINT REFERENCES orders(id),
  product_id BIGINT REFERENCES products(id),
  qty INTEGER,
  price REAL,
  prep_time_override INTERVAL
);

CREATE TABLE drivers (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  current_location TEXT,
  status TEXT,
  capacity REAL,
  tenant_id UUID
);

CREATE TABLE shipments (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  order_id BIGINT REFERENCES orders(id),
  driver_id BIGINT REFERENCES drivers(id),
  route TEXT,
  eta TIMESTAMPTZ,
  actual_delivery_at TIMESTAMPTZ,
  status TEXT
);

CREATE TABLE settlements (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  store_id BIGINT REFERENCES stores(id),
  period_start DATE,
  period_end DATE,
  gross REAL,
  commissions REAL,
  net REAL
);

CREATE TABLE events (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  entity_type TEXT,
  entity_id BIGINT,
  event_type TEXT,
  payload_json JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 5 — واجهات API نموذجية (JSON/REST)

**مثال: إنشاء طلب (Create Order)**

`POST /v1/stores/{store_id}/orders`

**Payload مختصر:**
```json
{
  "customer": {"id": "c_123", "name":"Ali", "phone":"+213..."},
  "items":[{"product_id":"p_1", "qty":2}],
  "delivery_address": {"lat": 36.7, "lon": 3.2, "address":"..."},
  "requested_slot":"2025-10-07T12:00:00+01:00",
  "payment_method":"card",
  "notes":"لا تضع صلصة"
}
```

**Response:** `order_id`, `estimated_eta`, `fulfillment_instruction` (which store/branch will pick).

**Webhook example: `order.updated`**

Event payload includes `tenant_id`, `order_id`, `status`, `eta`, `store_id`, `driver_id`.

## 6 — مخطط تدفق بيانات مبسّط

1.  طلب من العميل → API Gateway → Orders Service (validate)
2.  Orders Service → Inventory Service (reserve stock)
3.  Orders → Routing Service (compute best fulfillment: store/hub; assign driver)
4.  Events → Stream (Kafka) → Notifications, Analytics, Billing, SLA monitors
5.  Driver App receives assignment (via Push / WebSocket) → driver يؤكد → Shipment starts → Telemetry → Delivery complete → Settlement pipeline.

## 7 — KPIs خاصة بالمنصات متعددة المتاجر

-   On-time delivery per-store (%).
-   Average order preparation time per-store vs SLA.
-   Average commissions per-store.
-   Stock discrepancy rate (POS vs platform).
-   Conversion rate of offered slots.
-   % of cross-store fulfillment (split orders).
-   Time to settlement (TTS).

## 8 — مخاطر ومخففات (Multi-Store specific)

-   **مخاطر تكامل POS:** اختلاف APIs ونسخ/حذف بيانات → **مخفف:** نمط Adapter، وضع Sync modes (push/pull), retries، reconciliation jobs.
-   **تناقض المخزون:** عمليات متزامنة تُحدث oversell → **مخفف:** optimistic locking + reserve windows + cancelation rules.
-   **تسويات مالية معقدة:** فروقات إرجاع/خصم → **مخفف:** ledger محاسبي (immutable), reconciliation batch، custody of funds via escrow.
-   **حالات نزاع محلّي:** متاجر تطالب بمرجعية خاطئة → **مخفف:** chain-of-custody events + CV evidence عند التسليم.

## 9 — خارطة طريق تنفيذية مقترحة (MVP → v1 → v2)

**MVP (8–12 أسابيع)**
-   Onboarding stores (manual + CSV).
-   Order flow أساسي (single-store fulfill), Driver basic app, Reservations inventory.
-   Dashboard متجر وAdmin بسيط، Settlements batch بسيطة.

**v1 (12–20 أسابيع)**
-   Multi-stop routing, batching, dynamic ETA, POS integrations (1–2 connectors).
-   Payments + refunds, per-store settings, feature flags.

**v2 (بعد ذلك)**
-   Smart routing (RL), hubs & lockers, advanced billing, digital twin, federated learning، وA/B experiments.

## 10 — قائمة تذاكر MVP (Jira-style — مصنفة حسب الملحمة)

**Epic: Store Onboarding**
1.  **ST-001 — شاشة تسجيل متجر**
    -   *Acceptance:* متجر يمكنه التسجيل مع بيانات أساسية، يُنشأ `tenant_id`، يمكن تفعيل/إيقاف.
2.  **ST-002 — Import catalog CSV**
    -   *Acceptance:* CSV يُحمّل، منتجات تُنشأ، أخطاء CSV تعرض للمستخدم.

**Epic: Orders & Inventory**
3.  **OR-001 — Create Order API**
    -   *Acceptance:* إنشاء طلب يؤدي لحجز المخزون وتوليد `order_id` وETA.
4.  **OR-002 — Inventory Reservation**
    -   *Acceptance:* عند إنشاء أمر يتم تقليل `available_qty` مؤقتًا، مع آلية timeout لإلغاء الحجز.

**Epic: Driver & Routing**
5.  **RT-001 — Assign Driver (heuristic)**
    -   *Acceptance:* عند الطلب يُعيّن سائق متاح بناءً على قربه وسعة الحمولة.
6.  **RT-002 — Driver App: Accept/Start/Complete workflow**
    -   *Acceptance:* سائق يستلم المهمة، يبدأ الرحلة، يؤكد التسليم (مع صورة).

**Epic: Payments & Settlement**
7.  **PM-001 — Charge customer (card)**
    -   *Acceptance:* تكامل مع بوابة دفع، حالة الدفع تؤثر على حالة الطلب.
8.  **PM-002 — Daily Settlement Report**
    -   *Acceptance:* تقارير نهائية لكل متجر مع إجمالي المبيعات والعمولة.

**Epic: Dashboards & Notifications**
9.  **DB-001 — Store Dashboard (orders, KPIs)**
    -   *Acceptance:* المتجر يرى قائمة الطلبات، متوسط `prep_time`، on-time %.
10. **NT-001 — Notifications (order updates)**
    -   *Acceptance:* إشعارات SMS/Push عند تغيير الحالة (confirmed, out_for_delivery, delivered).

## 11 — معايير قبول عامة للتذاكر

-   كل API يجب أن يكون موثّقًا عبر OpenAPI (Swagger).
-   اختبارات وحدة لكل منطق حاسم، واختبارات تكامل End-to-End لتيار الطلب.
-   إعداد CI pipeline (lint, unit tests, integration smoke).
-   مستودع infra as code (k8s manifests / terraform) لبيئة staging.

## 12 — مؤشرات هندسية للتوسع (Non-functional)

-   **تخطيط للتحميل:** 10k req/s على API Gateway خلال فترات الذروة (قابل للزيادة).
-   **استجابة API:** p95 < 300ms للطلبات الحرجة (create order)، ETA recalculation p95 < 500ms.
-   **RPO/RTO للبيانات الحرجة:** RPO ≤ 5min, RTO ≤ 15min.

## 13 — خطوات عملية مقترحة لاحقة (مباشرة للتنفيذ)

1.  اعتمد نموذج الـtenant (pooled vs isolated).
2.  اختر 2–3 متاجر شريك للتجربة (pilot) مع POS مختلف.
3.  نفّذ MVP backlog (الأعلاه) مع CI/CD وجولة اختبارات في بيئة staging.
4.  أطلق pilot، اجمع KPI لمدة شهر، ثم قرر خطوات التوسع (routing advanced, hubs).