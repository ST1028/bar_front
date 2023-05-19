import { Menu } from "./Menu";

export interface MenuCategory {
    id: number;
    name: string;
    status: number;
    menus: Menu[];
    thumbnail: string;
    created_at: string;
    updated_at: string;
}