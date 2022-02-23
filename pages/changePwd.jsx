import React, { useState } from 'react';
import { useRouter } from "next/router";
import {
  Field, Button, Cell
} from 'react-vant';

export default function ChangePwd() {
  const [phone, setPhone] = useState('');
  const router = useRouter();
  return (
    <div>
      <Cell.Group>
        <Field
          required
          label="新密码"
          placeholder="请输入新密码"
        />
        <Field
          required
          label="新密码"
          placeholder="请再次输入新密码"
        />
        <Field
          value={phone}
          required
          label="手机号"
          placeholder="请输入手机号"
          errorMessage="手机号格式错误"
          onChange={setPhone}
        />
        <Field
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
          button={
            <Button size="small" type="primary">
              发送
            </Button>
          }
       />
      </Cell.Group>

      <div style={{ margin: '16px 16px 0' }}>
          <Button round nativeType="submit" type="primary" block size = "mini">
            提交
          </Button>
      </div>

      <div style={{ margin: '16px 16px 0' }}>
          <Button round nativeType="submit" type="primary" block size = "mini" onClick={()=>{router.push("/center")}}>
            返回
          </Button>
      </div>
    </div>
  );
}