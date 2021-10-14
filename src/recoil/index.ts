import { atom } from 'recoil'


export const authInfo = atom<Record<string, any>>({
    key: 'authInfo',
    default: {
        email: 'shiyu@xxx.com',
        nickname: '而且请问',
        vip_level: 3,
        points: 10000,
        isLogin: true
    }
})


