export interface OrderType{
    order_type_id: number
    order_type_name: string
}

export interface OrderTypeResponse{
    status: number
    message: string
    data: OrderType[]
}