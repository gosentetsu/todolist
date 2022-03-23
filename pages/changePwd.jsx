import React, { useState } from 'react';
import { useRouter } from "next/router";
import {
  Field, Button, Notify, Form
} from 'react-vant';
import NavBarCard from "../components/NavBarCard";

export async function getServerSideProps({ req }) {
  const { userId } = req.cookies;

  //TODO do not use abslute path here, not an efficient way to call internal API route here

  const res = await fetch("http://localhost:3000/api/users/" + userId, {
    headers: {
      Cookie: req.headers.cookie,
    },
  });
  const data = await res.json();
  return {
    props: { data, userId }, // will be passed to the page component as props
  };
}

export default function ChangePwd({userId}) {
  const router = useRouter();
  function updatePwd(values){
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    fetch("http://localhost:3000/api/users/" + userId, options)
      .then((response) => response.json())
      .then((res) => {
        let { message } = res;
        if (message == "success"){
          Notify.show({
            type:'primary',
            message
          });
          router.push("/login");
        }else{
          Notify.show({
            type:'warning',
            message
          });
        }
      });
  }
  return (
    <div>
      <NavBarCard title="修改密码" path="/center" />
      <Form
      showValidateMessage={false}
      onFinish={updatePwd}
      footer={
        <div style={{ margin: '16px 8px 0' }}>
          <Button square size = "small" nativeType="submit" type="primary" block>
            提交
          </Button>
        </div>
      }
    >
      <Form.Item
        tooltip={{
          message:
            '请输入原密码',
        }}
        rules={[{ required: true, message: '请填写原密码' }]}
        name="password"
        label="原密码"
      >
        <Field placeholder="请输入原密码" type = "password"/>
      </Form.Item>
      <Form.Item rules={[{ required: true, message: '请填写新密码' }]} name="newPass" label="新密码">
        <Field placeholder="请输入新密码" type = "password"/>
      </Form.Item>
    </Form>

    </div>
  );
}