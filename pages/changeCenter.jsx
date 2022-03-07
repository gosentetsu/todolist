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
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };
  const [username, setUsername] = useState('');
  return (
    <div>
      <NavBarCard title="修改个人信息" path="/center" />
      <Form
        form={form}
        onFinish={onFinish}
        footer={
          <div style={{ margin: '16px 16px 0' }}>
            <Button round nativeType="submit" type="primary" block size = "mini">
              提交
            </Button>
          </div>
        }
      >
      
        <Form.Item
          name="uploader"
          label="头像"
          rules={[{ required: true, message: '请选择文件' }]}
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
        <Form.Item name="textarea" label="用户名">
          <Field
              value={username}
              error
              required
              label="用户名"
              placeholder="请输入用户名"
              onChange={setUsername}
            />
        </Form.Item>
        <Form.Item name="textarea" label="个性签名">
          <Field 
              rows={3} 
              autosize 
              type="textarea" 
              maxlength={140} 
              showWordLimit />
        </Form.Item>
      
      </Form>
      
    </div>    
  );
}