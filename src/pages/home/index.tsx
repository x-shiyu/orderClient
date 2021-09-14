import React from "react";
import { DetailHeader } from "../components";
import style from './style.module.css'
export default function Home() {
    return (
        <main className={style.contentBox}>
            <ul className={style.sideList}>
                <li></li>
            </ul>
            <div>
                <DetailHeader title='商品' />
            </div>
        </main>
    )
}