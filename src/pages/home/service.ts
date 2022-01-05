import request from '@/request'
export interface BusinessInfo {
    name: string,
    thumb: string,
    vote: number,
    monthSell: number,
    desc: string,
    id: number,
    promotion?: {
        full: number
        minus: number
    }[]
}




export interface CoffeOrderInfo {
    category_name: string,
    category: number,
    name: string,
    month_sell: number,
    price: number,
    thumb: string,
    id: number
    abstract_money: number
    discount?: number,
    description:string
}


// 获取所有商家
export function getBusiness(current = 1, keywords?: string, pageSize = 10): Promise< BusinessInfo[]> {
    return request.get('/user/shop/', {
        params: {
            pageNo: current,
            pageSize,
            keywords
        }
    })
}

// 获取商家的所有商品
export function getCoffes(id: number): Promise<CoffeOrderInfo[]> {
    return request.get('/shop/goods', {
        params: {
            id
        }
    })
}

// 提交订单
export function submuitOrder(orderInfo: any): Promise<any> {
    return request.post('/order/list/',orderInfo)
}