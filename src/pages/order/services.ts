import { mock, Random } from "mockjs";
export interface CoffeOrder {
    createTime: number,
    name: string,
    goodsList: ICoffeItem[]
    id: number,
    thumb: string,
    totalPrice: number,
    status: string,
}
export interface ICoffeItem {
    thumb: string
    name: string
}
export function getOrders(): Promise<{ data: CoffeOrder[] }> {
    const categoryNameArr: any[] = []
    for (let i = 0; i < 5; i++) {
        categoryNameArr.push({
            name: Random.cword(3, 8),
            id: Random.natural(),
        })
    }
    const mockData: CoffeOrder[] = []
    for (let i = 0; i < Random.integer(14, 20); i++) {
        const categoryInfo = categoryNameArr[Random.integer(0, 4)]
        mockData.push({
            name: Random.cword(8, 16),
            createTime: Date.now(),
            thumb: Random.url(),
            id: Random.natural(),
            status: '进行中',
            discount: [{
                full: Random.integer(20, 40),
                minus: Random.integer(10, 20)
            }, {
                full: Random.integer(20, 40),
                minus: Random.integer(10, 20)
            }, {
                full: Random.integer(20, 40),
                minus: Random.integer(10, 20)
            }, {
                full: Random.integer(20, 40),
                minus: Random.integer(10, 20)
            }],
            goodsList: [{
                thumb: Random.url(),
                name: Random.csentence(5, 10)
            }, {
                thumb: Random.url(),
                name: Random.csentence(5, 10)
            }, {
                thumb: Random.url(),
                name: Random.csentence(5, 10)
            }, {
                thumb: Random.url(),
                name: Random.csentence(5, 10)
            }, {
                thumb: Random.url(),
                name: Random.csentence(5, 10)
            }, {
                thumb: Random.url(),
                name: Random.csentence(5, 10)
            }, {
                thumb: Random.url(),
                name: Random.csentence(5, 10)
            }, {
                thumb: Random.url(),
                name: Random.csentence(5, 10)
            }, {
                thumb: Random.url(),
                name: Random.csentence(5, 10)
            }],
            totalPrice: Random.float(20, 100)
        })
    }
    return Promise.resolve({
        data: mockData
    })
}

