import React from 'react';
import { useRouter } from "next/router";
import { Form, Button, Field} from 'react-vant';
import NavBarCard from "../components/NavBarCard";

export default function Connect() {
  const router = useRouter();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div>
      <NavBarCard title="问题反馈" path="/center" />
      <Form
      form={form}
      onFinish={onFinish}
      footer={
        <div style={{ margin: '16px 16px 0' }}>
          <Button round nativeType="submit" type="primary" block size = "small">
            提交
          </Button>
        </div>

        
      }
    >
      
        <Form.Item name="textarea" label="问题描述">
          <Field rows={3} autosize type="textarea" maxlength={200} showWordLimit/>
        </Form.Item>
      
      </Form>
      
    </div>    
  );
}