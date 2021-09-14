import { atom } from 'recoil'


export const authInfo = atom<Record<string, any>>({
    key: 'authInfo',
    default: {}
})