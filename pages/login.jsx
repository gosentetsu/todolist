import React from "react";
import { Form, Input, Button, Space } from "antd-mobile";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  function login(values) {
    fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => console.log(res));
    console.log(values);
  }
  return (
    <main className="center">
      <Form
        mode="card"
        onFinish={login}
        layout="vertical"
        footer={
          <Button block type="submit" size="large" color="primary">
            登录
          </Button>
        }
      >
        <Form.Item label="用户名" name="userName">
          <Input placeholder="请输入用户名" clearable />
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input placeholder="请输入密码" clearable type="password" />
        </Form.Item>
      </Form>
      <Button
        style={{
          marginLeft: "0.8rem",
          marginRight: "0.8rem",
        }}
        size="large"
        fill="outline"
        color="primary"
        onClick={() => router.push("/register")}
      >
        注册
      </Button>
    </main>
  );
}
