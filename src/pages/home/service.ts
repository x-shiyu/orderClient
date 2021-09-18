import { mock } from "mockjs";
export interface BusinessInfo {
    name: string,
    thumb: string,
    vote: number,
    monthSell: number,
    desc: string,
    id: number
}


export function getBusiness(current = 1, keywords?: string): Promise<{ data: { total: number, list: BusinessInfo[] } }> {
    return Promise.resolve(mock({
        "data": {
            'list|10': [{
                name: '@cword(5,10)',
                thumb: '@url',
                vote: '@float(0,4,1,1)',
                desc: '@cword(5,10)',
                id: '@natural'
            }],
            total: 100
        }
    }))
}