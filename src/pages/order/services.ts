import request from '@/request'
export interface CoffeOrder {
    createTime: number,
    name: string,
    goodsList: ICoffeItem[]
    id: number,
    thumb: string,
    totalPrice: number,
    status: string,
    discount?: { full: number, minus: number }[]
}
export interface ICoffeItem {
    thumb: string
    name: string
}
export function getOrders(): Promise<CoffeOrder[]> {
    return request.get('/order/list')
}

