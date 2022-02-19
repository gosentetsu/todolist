import React from "react";
import { Space, Form, Input, Button } from "antd-mobile";
import { useRouter } from "next/router";
export default function Register() {
  const router = useRouter();
  function register(values) {
    fetch("/api/users", {
      method: "POST",
      body: values,
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }
  return (
    <main className="center">
      <Form
        mode="card"
        onFinish={register}
        layout="vertical"
        footer={
          <Button block type="submit" size="large" color="primary">
            注册用户
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
        onClick={() => router.push("/login")}
      >
        登录页面
      </Button>
    </main>
  );
}
