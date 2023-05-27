export interface OrderRequest {
    menu_id: number
    friend_ids: number[]
    blend_id: number| undefined
    remarks: string| null| undefined
}
