import React from "react";
export function AddAndMin({ current, setCurrent }: { current: any, setCurrent: any }) {
    return (
        <div className='fx-between fx-h-center' style={{ height: 60 }}>
            <span className='f30' onClick={() => {
                if (current - 1 > -1) {
                    setCurrent(current - 1)
                }
            }}>-</span>
            <span className='f30' style={{ width: 30, height: 30, borderRadius: 15, background: 'green', display: 'inline-block' }}>{current}</span>
            <span className='f30' onClick={() => {
                if (current) {
                    setCurrent(current + 1)
                } else {
                    setCurrent(1)
                }
            }}>+</span>
        </div>
    )
}