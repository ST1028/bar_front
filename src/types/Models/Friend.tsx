import { Order } from "./Order";

export interface Friend {
    id: number;
    name: string;
    orders: Order[];
    total_price: number;
    created_at: string;
    updated_at: string;
}