import { mock, Random } from "mockjs";
export interface BusinessInfo {
    name: string,
    thumb: string,
    vote: number,
    monthSell: number,
    desc: string,
    id: number,
    discount?: {
        full: number
        minus: number
    }[]
}


export function getBusiness(current = 1, keywords?: string): Promise<{ data: { total: number, list: BusinessInfo[] } }> {
    return Promise.resolve(mock({
        "data": {
            'list|10': [{
                name: '@cword(5,10)',
                thumb: '@url',
                vote: '@float(0,4,1,1)',
                desc: '@cword(5,10)',
                id: '@natural',
                'discount|3-4': [{
                    full: '@integer(30,60)',
                    minus: '@integer(10,30)'
                }]
            }],
            total: 100
        }
    }))
}


export interface CoffeOrderInfo {
    categoryName: string,
    categoryId: number,
    name: string,
    monthSell: number,
    price: number,
    thumb: string,
    id: number
    canUsePoints: number
    discount?: {
        full: number
        minus: number
    }[]
}
export function getCoffes(id: number): Promise<{ data: CoffeOrderInfo[] }> {
    const categoryNameArr: any[] = []
    for (let i = 0; i < 5; i++) {
        categoryNameArr.push({
            name: Random.cword(3, 8),
            id: Random.natural(),
        })
    }
    const mockData: CoffeOrderInfo[] = []
    for (let i = 0; i < Random.integer(14, 20); i++) {
        const categoryInfo = categoryNameArr[Random.integer(0, 4)]
        mockData.push({
            categoryName: categoryInfo.name,
            categoryId: categoryInfo.id,
            name: Random.cword(8, 16),
            monthSell: Random.integer(0, 300),
            price: Random.float(10, 30),
            thumb: Random.url(),
            id: Random.natural(),
            canUsePoints: Random.integer(100, 600),
        })
    }
    return Promise.resolve({
        data: mockData
    })
}

export function submuitOrder(selected: any): Promise<any> {
    return Promise.resolve({
        code: 200
    })
}