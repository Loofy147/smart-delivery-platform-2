CREATE TABLE stores (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  tenant_id UUID,
  name TEXT NOT NULL,
  description TEXT,
  address TEXT,
  timezone TEXT,
  commission_rate REAL,
  is_active BOOLEAN DEFAULT TRUE,
  prep_time_default INTERVAL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE products (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  store_id BIGINT REFERENCES stores(id),
  sku TEXT,
  name TEXT NOT NULL,
  description TEXT,
  price REAL,
  weight REAL,
  dimensions TEXT,
  stock_qty INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);