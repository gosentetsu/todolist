import React, { useState } from 'react';
import { useRouter } from "next/router";
import {
  Button,
  Field,
  Uploader,
  Form,
} from 'react-vant';
import NavBarCard from "../components/NavBarCard";

export default function ChangeCenter() {
  const router = useRouter();
  function updateCenter(values){
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    fetch("http://localhost:3000/api/users/user_01", options)
      .then((response) => response.json())
      .then((res) => {
        let { message } = res;
        console.log(message)
        if (message === "success") {
          router.push("/center");
        }
      });
  }
  return (
    <div>
      <NavBarCard title="修改个人信息" path="/center" />
      <Form
        onFinish={updateCenter}
        footer={
          <div style={{ margin: '16px 16px 0' }}>
            <Button round nativeType="submit" type="primary" block size = "mini">
              提交
            </Button>
          </div>
        }
      >
      
        <Form.Item
          
          label="头像"
          
          initialValue={[
            {
              url: 'https://img.yzcdn.cn/vant/sand.jpg',
              status: 'done',
              name: '图片名称',
            },
          ]}
        >
          <Uploader />
        </Form.Item>
        <Form.Item name="userName" label="用户名" rules={[{ required: true, message: '用户名不能为空' }]}>
          <Field
              required
              placeholder="请输入用户名"
            />
        </Form.Item>
        <Form.Item name="slogan" label="个性签名">
          <Field 
              rows={3} 
              autosize 
              type="textarea"
              placeholder="请输入个性签名"
              maxlength={140} 
              showWordLimit />
        </Form.Item>
      
      </Form>
      
    </div>    
  );
}