import React, { useState } from 'react'
import { useMount } from 'ahooks'
import { getOrders, CoffeOrder } from './services'
import style from './style.module.css'
import { formatDate } from '../../utils'
import {Button, message} from 'antd'
import request from '@/request'
function Order({ data,handleOver }: { data: CoffeOrder,handleOver:any }) {
 
  return (
    <div className="bgc444">
      <ul className={style.order_list}>
        <li>
          <span>{data.status}</span>
          {data.status === '进行中' && <Button onClick={()=>handleOver(data.id)} style={{position:'absolute',right:'10px',top:'50px'}} type='primary' size='small'>完结订单</Button>}
          <div className={style.order_item_head}>
            <img
              src={`/api/file/fetch?id=${data.thumb}`}
              alt=""
              width="80"
              height="80"
            />
            <section>
              <p>{data.name}</p>
              <span>创建日期：{formatDate(data.createTime)}</span>
              <p className={style.discount_box}>
                {data.discount?.map((item, index) => (
                  <span key={index}>
                    {item.full}减{item.minus}
                  </span>
                ))}
              </p>
            </section>
          </div>
          <ul className={style.order_detail_list}>
            {data.goodsList.map((good) => (
              <li key={good.name}>
                <img
                  src={`/api/file/fetch?id=${good.thumb}`}
                  alt=""
                  width="60"
                  height="60"
                />
                <p>{good.name}</p>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  )
}

const statusMapName: any = {
  1: '待接单',
  2: '进行中',
  3: '已完成',
  4:'被拒绝'
}
export default function OrderedList() {
  const [list, setList] = useState<CoffeOrder[]>([])
  useMount(() => {
    getOrders().then((list: any[]) => {
      setList(
        list.map((item) => ({
          ...item,
          status: statusMapName[item.status],
        }))
      )
    })
  })

  const handleOver = (order_id:number)=>{
    request.put('/order/list/',{
      order_id
    }).then(()=>{
      message.success('操作成功!')
      const matchIndex = list.findIndex(item=>item.id===order_id)
      const matchItem = {...list[matchIndex]}
      matchItem.status = '已完成'
      list.splice(matchIndex,1,matchItem)
      setList([...list])
    })
  }


  return (
    <div
      style={{
        height: '100vh',
        overflow: 'auto',
        width: '100%',
        background: '#444',
      }}
    >
      <h1 className={style.order_head}>订单列表</h1>
      <main className={style.order_box}>
        {list.map((item) => (
          <Order key={item.id} data={item} handleOver={handleOver}/>
        ))}
      </main>
    </div>
  )
}
