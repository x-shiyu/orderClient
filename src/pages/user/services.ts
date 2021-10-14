import { mock, Random } from "mockjs";

export function updateUserInfo(params: { pwd: string, oldPwd: string }): Promise<{ data: { code: number } }> {
    return Promise.resolve({
        data: {
            code: 200
        }
    })
}

