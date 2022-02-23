import React, { useState } from 'react';
import { useRouter } from "next/router";
import {
  Button,
  Field,
  Uploader,
  Form,
} from 'react-vant';

export default function ChangeCenter() {
  const router = useRouter();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };
  const [username, setUsername] = useState('');
  return (
    <div>
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
        label="新头像"
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
      <Form.Item name="textarea" label="新用户名">
        <Field
            value={username}
            error
            required
            label="用户名"
            placeholder="请输入用户名"
            onChange={setUsername}
          />
      </Form.Item>
      <Form.Item name="textarea" label="新个签">
        <Field 
            rows={3} 
            autosize 
            type="textarea" 
            maxlength={140} 
            showWordLimit />
      </Form.Item>
      
    </Form>
      <div style={{ margin: '16px 16px 0' }}>
          <Button round nativeType="submit" type="primary" block size = "mini" onClick={()=>{router.push("/center")}} >
            返回
          </Button>
      </div>
    </div>    
  );
}