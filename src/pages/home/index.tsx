import React, { useState, useEffect } from "react";
import { DetailHeader } from "../components";
import { useMount, usePersistFn, useRequest } from 'ahooks'
import style from './style.module.css'
import { getCoffes, getBusiness, BusinessInfo, CoffeOrderInfo, submuitOrder } from './service'
import { Button, message, Pagination } from "antd";
import { formatCoffeList, FormattedCoffeInfo } from './utils'
import { AddAndMin } from "./AddAndMin";
import { useData } from "./orderHandler";
import { addOrderAction, selectedCoffeNum, addOrderInfo } from "./atoms";
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'

const PAGESIZE = 10

function BusinessList({ list, activeBus, setActive }: { list: BusinessInfo[], activeBus: number, setActive: any }) {
    return (
        <>
            {list.map(item => (<div key={item.id} onClick={() => {
                setActive(item.id)
            }} className={`p10 m10 ${activeBus === item.id ? 'bgc777' : 'bgc444'} radius5 fx pointer`}>
                <img src={item.thumb} width={60} height={60} />
                <section className={`ceee pl10 f12`}>
                    <h3 className='ceee'>{item.name}</h3>
                    <p>{item.vote} 月售{item.monthSell}</p>
                    <p>{item.desc}</p>
                </section>
            </div>))}
        </>
    )
}

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

export default function Home() {
    const [business, setBusiness] = useState<BusinessInfo[]>([])
    const [current, setCurrent] = useState<number>(1)
    const [total, setTotal] = useState<number>(0)
    const [activeBus, setActiveBus] = useState<number>(-1)
    const [coffeList, setCoffeList] = useState<FormattedCoffeInfo[]>([])
    const selectedNum = useRecoilValue(selectedCoffeNum)
    const [selectedObj, setSelected] = useRecoilState(addOrderInfo)

    useEffect(() => {
        getCoffes(activeBus).then((response) => {
            setCoffeList(formatCoffeList(response.data))
        })
    }, [activeBus])
    const handleSearch = async (current: number) => {
        setCurrent(current)
        const { data } = await getBusiness(current)
        setBusiness(data.list)
        setTotal(data.total)
    }

    useMount(() => {
        handleSearch(1)
    })

    const onSubmitOrder = usePersistFn(() => {
        submuitOrder(selectedObj).then(() => {
            message.success('下单成功！')
            setSelected({})
        })
    })
    return (
        <main className={style.contentBox}>
            <div className={style.sideList}>
                <div className={style.scrollBox}>
                    <BusinessList list={business} activeBus={activeBus} setActive={setActiveBus} />
                </div>
                <div className={style.pageBox} >
                    <Pagination simple total={total} current={current} onChange={(current) => {
                        handleSearch(current)
                    }} />
                </div>
            </div>
            <div className={style.goodsBox}>
                <DetailHeader title='商品' />
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
        </main>
    )
}