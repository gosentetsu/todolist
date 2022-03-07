import React from "react";
<<<<<<< HEAD
import { Form, Input, Button, Toast, Dialog } from "antd-mobile";
=======
import { Form, Input, Button, Space, Toast } from "antd-mobile";
>>>>>>> 7b5c32d974fd458c3ba4ea707e991e74f8f0ecea
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setInfo } from "../app/features/user/userSlice";
export default function Login() {
  const router = useRouter();
  function login(values) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

<<<<<<< HEAD
    fetch("/api/users/login", options)
=======
    fetch("http://localhost:3000/api/users/login", options)
>>>>>>> 7b5c32d974fd458c3ba4ea707e991e74f8f0ecea
      .then((response) => response.json())
      .then((res) => {
        let { message } = res;
        Toast.show({
          content: message,
        });
        if (message === "success") {
          router.push("/home");
        }
      });
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
