import React from "react";
import { Form, Input, Button, Space } from "antd-mobile";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  return (
    <div>
      <Space
        block
        justify="center"
        style={{
          minHeight: "100vh",
          padding: "1rem",
        }}
        direction="vertical"
      >
        <Form layout="vertical">
          <Form.Item label="用户名" name="username">
            <Input placeholder="请输入用户名" clearable />
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input placeholder="请输入密码" clearable type="password" />
          </Form.Item>
        </Form>
        <Button block size="large" color="primary">
          登录
        </Button>
        <Button
          block
          size="large"
          fill="outline"
          color="primary"
          onClick={() => router.push("/register")}
        >
          注册
        </Button>
      </Space>
    </div>
  );
}
