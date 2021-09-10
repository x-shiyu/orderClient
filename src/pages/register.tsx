import React, { useState } from "react";
import { List, Input, Button } from 'antd-mobile';
const Item = List.Item;
export default function Register() {
    const [email, setEmail] = useState<string>('')
    const [pwd, setPwd] = useState<string>('')
    return (<List>
        <Item>
            <Input
                value={email}
            />
        </Item>
        <Item>
            <Input placeholder="please input password" type="password" />
        </Item>
        <Item align='middle'>
            <Button style={{ width: 200 }}>注册</Button>
        </Item>
    </List>)

}