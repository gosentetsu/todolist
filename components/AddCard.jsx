import React, { useState } from "react";
import { useRouter } from "next/router";
import { Form, Button, Field, Rate } from 'react-vant';
import { CalendarItem, PickerItem } from '../components/CombinedItems.tsx';

const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`;

export default function AddCard(props){
  const [form] = Form.useForm();
  const { initdate } = props;
  const router = useRouter();
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <Form
      form={form}
      onFinish={onFinish}
      footer={
        <div style={{ margin: '16px 16px 0' }}>
          <Button round nativeType="submit" type="primary" block onClick={()=>{}}>
            提交
          </Button>
        </div>
      }
    >
      <Form.Item
        rules={[{ required: true, message: '请填写待办事项名称' }]}
        name="taskname"
        label="待办事项"
      >
        <Field placeholder="请输入待办事项名称" />
      </Form.Item>

      <Form.Item name="priority" label="优先级" initialValue={3}>
        <Rate />
      </Form.Item>

      <Form.Item 
        name="picker"
        label="类型" 
        rules={[{ required: true, message: '请选择待办事项类型' }]}
        customField>
        <PickerItem placeholder="选择类型" />
      </Form.Item>
      <Form.Item
        name="calendar"
        label="日期" 
        initialValue={initdate}
        customField>
        <CalendarItem placeholder="选择日期" />
      </Form.Item>
      
      <Form.Item name="note" label="备注">
        <Field rows={3} autosize type="note" maxlength={140} showWordLimit />
      </Form.Item>
    </Form>
  )
}