import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { formatCoffeList, FormattedCoffeInfo } from './utils'
import { selectedCoffeNum, addOrderAction, addOrderInfo } from "./atoms";
import { useRecoilState, useRecoilValue } from 'recoil'
import style from './style.module.css'
import { submuitOrder, getCoffes } from './service'
import { usePersistFn } from 'ahooks'
import { AddAndMin } from './AddAndMin'
import { message } from 'antd'
import { getActiveId } from './hooks'

function CoffeOrder({ data }: { data: FormattedCoffeInfo }) {
    function CofferItem({ item }: { item: any }) {
        const [addOrder, setAddOrder] = useRecoilState(addOrderAction(item.id))
        return (
            <li className={style.orderItem} key={item.id}>
                <img src={item.thumb} width='60' height='60' />
                <section>
                    <h4 className='f14 cbbb'>{item.name}</h4>
                    <p>月售{item.monthSell}</p>
                    <p>{item.price}</p>
                </section>
                <div style={{ position: 'absolute', right: 5, width: 80 }}>
                    <AddAndMin current={addOrder} setCurrent={setAddOrder} />
                </div>
            </li>
        )
    }
    return (
        <div id={data.categoryId as any} className='pt20'>
            <h2 className='ceee' >{data.categoryName}</h2>
            <ul>
                {data.children.map(item => {
                    return (
                        <CofferItem item={item} key={item.id} />
                    )
                })}
            </ul>
        </div>
    )
}
export default function GoodsList({ setActiveBus }: { setActiveBus: any }) {
    const [coffeList, setCoffeList] = useState<FormattedCoffeInfo[]>([])
    const selectedNum = useRecoilValue(selectedCoffeNum)
    const [selectedObj, setSelected] = useRecoilState(addOrderInfo)

    const [id] = getActiveId()
    useEffect(() => {
        setActiveBus(id)
        if (id !== -1) {
            getCoffes(id).then((response) => {
                setCoffeList(formatCoffeList(response.data))
            })
        }
    }, [id])


    const onSubmitOrder = usePersistFn(() => {
        submuitOrder(selectedObj).then(() => {
            message.success('下单成功！')
            setSelected({})
        })
    })
    return <div>
        <div>
            <div className='fx-between' style={{ width: 600, margin: '0 auto' }}>
                <ul style={{ marginTop: 40 }}>
                    {coffeList.map(item => (<li className='pt10' key={item.categoryId}>
                        <a href={'#' + item.categoryId}> {item.categoryName}</a>
                    </li>))}
                </ul>
                <div className={style.orderBox}>
                    {coffeList.map(item => <CoffeOrder key={item.categoryId} data={item} />)}
                </div>
            </div>
        </div>
        <footer className={style.summaryBox}>
            <div className='cddd fx fx fx-h-center pl20 fx-between pr20' style={{ height: '100%' }}>
                <span>已选 {selectedNum} </span>
                <Button disabled={selectedNum === 0} onClick={onSubmitOrder}>下单</Button>
            </div>
        </footer>
    </div>
}