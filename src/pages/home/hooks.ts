import { usePersistFn } from 'ahooks'
import { useState } from 'react'
export const createHander = (): { useData: any } => {
    let _data: any[] = []
    let bindCom: any[] = []
    function setData(value: any[]) {
        _data = value
        bindCom.forEach((setFn) => {
            setFn(value)
        })
    }
    const useData = () => {
        const [state, setState] = useState()
        bindCom.push(setState)
        return [state, setData]
    }

    return {
        useData
    }
}


