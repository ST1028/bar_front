import { Blend } from './Blend';

export interface Menu {
    id: number;
    name: string;
    price: number;
    description: string;
    status: number;
    blends: Blend[];
    thumbnail: string;
    is_remarks_required: boolean;
    created_at: string;
    updated_at: string;
}