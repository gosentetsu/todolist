import React, { useState } from 'react';
import { useRouter } from "next/router";
import {
  Field, Button, Cell
} from 'react-vant';
import NavBarCard from "../components/NavBarCard";

export default function ChangePwd() {
  const [phone, setPhone] = useState('');
  const router = useRouter();
  return (
    <div>
      <NavBarCard title="修改密码" path="/center" />
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
        
      </Cell.Group>

      <div style={{ margin: '16px 16px 0' }}>
          <Button round nativeType="submit" type="primary" block size = "mini">
            提交
          </Button>
      </div>

    </div>
  );
}