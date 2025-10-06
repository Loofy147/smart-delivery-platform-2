STORES {
    uuid id PK
    string name
    string address
    string contact_number
    string operating_hours
    uuid manager_id FK
    timestamp created_at
    timestamp updated_at
}

PRODUCTS {
    uuid id PK
    uuid store_id FK
    string name
    string description
    decimal price
    string image_url
    boolean is_available
    timestamp created_at
    timestamp updated_at
}

ORDERS {
    uuid id PK
    uuid customer_id FK
    uuid store_id FK
    uuid driver_id FK
    string order_number
    string status "pending | accepted | in_transit | delivered | cancelled"
    string delivery_address
    json order_items
    decimal total_amount
    string payment_method
    timestamp created_at
    timestamp updated_at
}

DRIVERS {
    uuid id PK
    string name
    string contact_number
    boolean is_available
    geography current_location
    timestamp created_at
    timestamp updated_at
}

USERS ||--o{ ORDERS : places
STORES ||--o{ PRODUCTS : has
STORES ||--o{ ORDERS : receives
DRIVERS ||--o{ ORDERS : delivers
USERS ||--o| STORES : manages
