export interface Order {
    order_id?: string;
    customer_name: string;
    order_status: number;
    observations: string;
    shipping: number;
    created_at?: string;
    updated_at?: string;
    active?: number;
}

export interface OrderResponse {
    status: number;
    message: string;
    data: Order[];
}

export interface OrderWithSub{
    order_id?: string;
    customer_name: string;
    order_status: number;
    observations: string;
    shipping: number;
    created_at?: string;
    updated_at?: string;
    active?: number;
    sub_orders: SubOrder[];
}

export interface SubOrder {
    sub_order_id?: string;
    order_id?: string;
    product_id?: string;
    quantity: number;
    observation: string;
    created_at?: string;
    updated_at?: string;
    active?: number;
}