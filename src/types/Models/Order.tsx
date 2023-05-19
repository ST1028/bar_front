import { Friend } from "./Friend";
import { Menu } from "./Menu";

export interface Order {
    id: number;
    name: string;
    price: number;
    friend: Friend;
    menu_id: number;
    menu: Menu;
    blend_id: number;
    created_at: string;
    updated_at: string;
}