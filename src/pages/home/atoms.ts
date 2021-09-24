import { atom, selectorFamily } from 'recoil'


export const addOrderInfo = atom<Record<string, any>>({
    key: 'addOrderInfo',
    default: {}
})


export const addOrderAction = selectorFamily<number | undefined, any>({
    key: 'addOrderInfo',
    get: (id) => ({ get }) => {
        return get(addOrderInfo)[id]
    },
    set: (id) => ({ set, get }, newValue) => {
        set(addOrderInfo, {
            ...get(addOrderInfo),
            [id]: newValue
        })
    }
})