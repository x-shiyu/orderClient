
import React, { useState, useEffect } from 'react';
import { usePersistFn } from 'ahooks'
import { Form, Input, Button, Checkbox } from 'antd';
import { Header } from '../components/'
import style from './style.module.css'
export default function Register() {
    const [email, setEmail] = useState<string>('')
    const [pwd, setPwd] = useState<string>('')
    const [pwdConfirm, setPwdConfirm] = useState<string>('')
    const [form] = Form.useForm();

    const handleRegister = usePersistFn(() => {
        form.validateFields().then((values) => {
            debugger
        })
        console.log('注册');
    })

    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };
    const formTailLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 8, offset: 12 },
    };

    return (
        <div>
            <Header></Header>
            <div className={style['registerBox']}>
                <Form form={form} name="from-register">
                    <Form.Item
                        {...formItemLayout}
                        name="email"
                        label="邮箱"
                        rules={[
                            {
                                required: true,
                                message: '请输入邮箱',
                            },
                        ]}
                    >
                        <Input value={email} onChange={(ev) => {
                            setEmail(ev.target.value)
                        }} placeholder="请输入" />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        name="pwd"
                        label="密码"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },

                        ]}
                    >
                        <Input type='password' value={pwd} onChange={(ev) => {
                            setPwd(ev.target.value)
                        }} placeholder="请输入" />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        name="pwd_confirm"
                        label="重复密码"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('pwd') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('密码不相等'));
                                },
                            }),
                        ]}
                    >
                        <Input type='password' value={pwdConfirm} onChange={(ev) => {
                            setPwdConfirm(ev.target.value)
                        }} placeholder="请输入" />
                    </Form.Item>
                    <Form.Item {...formTailLayout}>
                        <Button type="primary" onClick={handleRegister}>
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )


}