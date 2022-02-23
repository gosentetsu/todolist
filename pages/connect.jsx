import React from 'react';
import { useRouter } from "next/router";
import { Form, Button, Field} from 'react-vant';

export default function Connect() {
  const router = useRouter();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div>
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
      
        <Form.Item name="textarea" label="问题反馈">
          <Field rows={3} autosize type="textarea" maxlength={200} showWordLimit/>
        </Form.Item>
      
      </Form>
      <div style={{ margin: '16px 16px 0' }}>
          <Button round nativeType="submit" type="primary" block size = "mini" onClick={()=>{router.push("/center")}}>
            返回
          </Button>
      </div>
    </div>    
  );
}