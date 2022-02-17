import React, { useState } from "react";
import { useRouter } from "next/router"
import { Form, Button, Field, Rate, Cell, hooks, Calendar } from 'react-vant';

const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`;

export default function Add(){
  const router = useRouter();
  const [form] = Form.useForm();
  const [state, set] = hooks.useSetState({
    single: false,
    singleText: '',
    multi: false,
    multiText: '',
  });
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <Form
      form={form}
      onFinish={onFinish}
      footer={
        <div style={{ margin: '16px 16px 0' }}>
          <Button round nativeType="submit" type="primary" block onClick={()=>{router.push("/task")}}>
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
      <Cell
        title="选择单个日期"
        value={state.singleText}
        isLink
        onClick={() => set({ single: true })}
      />
      <Calendar
        showConfirm={false}
        visible={state.single}
        onClose={() => set({ single: false })}
        onConfirm={(v) => {
          set({ single: false, singleText: formatDate(v) });
        }}
      />
      <Form.Item name="note" label="备注">
        <Field rows={3} autosize type="note" maxlength={140} showWordLimit />
      </Form.Item>
    </Form>
  )
}