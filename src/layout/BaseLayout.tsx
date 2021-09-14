import React, { useState } from "react";
import Home from '../pages/home';
import User from '../pages/user';
import Order from '../pages/order';
import { Route, Switch, useHistory } from "react-router-dom";
import style from './baselayout.module.css'
import { CoffeeOutlined, BarsOutlined, SettingOutlined } from '@ant-design/icons'
import { useActiveTab } from "../pages/hooks";
import coffeIcon from '@/assets/images/coffee.png'
export default function BaseLayout() {
    const activeKey = useActiveTab('coffe')
    const history = useHistory()
    const sideItems = [{
        title: '咖啡',
        icon: <CoffeeOutlined className={style.sideIcon} />,
        key: 'coffe'
    }, {
        title: '订单',
        icon: <BarsOutlined className={style.sideIcon} />,
        key: 'order'
    }, {
        title: '我的',
        icon: <SettingOutlined className={style.sideIcon} />,
        key: 'user'
    }]

    return (
        <div className='fx' style={{ height: '100vh' }}>
            <aside style={{ width: 80 }} className='bgc333'>
                <ul className={style.sideBox}>
                    <li>
                        <section className={style.iconBox}>
                            <img src={coffeIcon} height={30} alt="" />
                        </section>
                    </li>
                    {sideItems.map(item => (
                        <li key={item.key} style={{ color: activeKey === item.key ? '#a7cd45' : '#aaa' }} onClick={() => {
                            history.push('/' + item.key)
                        }}>
                            <div>
                                {item.icon}
                                <p>{item.title}</p>
                            </div>
                        </li>
                    ))}
                </ul>

            </aside>
            <Switch>
                <Route path='/order' exact>
                    <Order />
                </Route>
                <Route path='/user' exact>
                    <User />
                </Route>
                <Route path='*'>
                    <Home />
                </Route>
            </Switch>
        </div>
    )
}
