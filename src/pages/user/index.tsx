import React, { useState, useMemo, useEffect } from 'react'
import { Drawer, Form, Button, Input, message } from 'antd'
import { authInfo } from '../../recoil'
import { useRecoilState } from 'recoil'
import { updateUserInfo } from './services'
import request from '@/request'
import { useHistory } from 'react-router'

function PasswordForm({ setVisible }: { setVisible: any }) {
  const [userInfo, setUserInfo] = useRecoilState(authInfo)
  const [form] = Form.useForm()
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  }
  const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
  }

  useEffect(() => {
    request.get('/user/info').then((response) => {
      setUserInfo(response)
    })
  }, [])
  const onUpdate = () => {
    form.validateFields().then(async (values) => {
      await updateUserInfo(values)
      message.success('修改成功')
      setVisible(false)
    })
  }

  return (
    <Form form={form} name="dynamic_rule">
      <Form.Item
        {...formItemLayout}
        name="oldPassword"
        label="旧密码"
        rules={[
          {
            required: true,
            message: '请输入原密码',
          },
        ]}
      >
        <Input.Password placeholder="请输入原密码" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="password"
        label="新密码"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
      >
        <Input.Password placeholder="请输入密码" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="pwdConfirm"
        label="重复密码"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('两次密码不相同!'))
            },
          }),
        ]}
      >
        <Input.Password placeholder="请输入密码" />
      </Form.Item>
      <Form.Item {...formTailLayout}>
        <Button type="primary" onClick={onUpdate}>
          提交
        </Button>
      </Form.Item>
    </Form>
  )
}
export default function User() {
  const [info] = useRecoilState(authInfo)
  const [visible, setVisible] = useState<boolean>(false)
  const history = useHistory()
  const logout = ()=>{
    request.post('/auth/logout/').then(()=>{
      message.success('退出成功')
      setTimeout(()=>{
        history.push('/login')
      })
    })
  }
  return (
    <div className="bgc444 cddd pt20" style={{ width: '100%' }}>
      <h1 className="cddd txc">账户信息</h1>
      <ul>
        <li className="txc pt10">邮箱：{info.email}</li>
        <li className="txc pt10">积分：{info.abstract_money}</li>
        <li
          className="txc pt10"
          onClick={() => {
            setVisible(true)
          }}
        >
          <Button type="primary">修改密码</Button>
        </li>
        <li
          className="txc pt10"
          onClick={logout}
        >
          <Button type="primary">退出登录</Button>
        </li>
      </ul>
      <Drawer
        title={null}
        placement="right"
        closable={false}
        width={600}
        onClose={() => {
          setVisible(false)
        }}
        visible={visible}
      >
        <PasswordForm setVisible={setVisible} />
      </Drawer>
    </div>
  )
}
