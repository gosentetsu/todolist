import React from "react";
import { useRouter } from "next/router";
import { Form, Button, Field, Rate, Toast } from 'react-vant';
import { PickerItem, TimeItem } from '../components/CombinedItems.tsx';



export default function AddCard(props){
  const [form] = Form.useForm();
  const { initdate,userId } = props;
  const router = useRouter();
  

  const addTask = (values) => {
    values.beginTime = values.beginTime.valueOf();
    values.endTime = values.endTime.valueOf();
    if(values.beginTime > values.endTime) {
      Toast.fail('结束时间应大于等于开始时间');
      return;
    }
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    fetch("/api/tasks/" + userId, options)
      .then((response) => response.json())
      .then((res) => {
        let { message } = res;
        Toast({
          message: message,
          forbidClick: true,
        });
        if (message === "success") {
          router.push("/schedule");
        }
      });
  }

  


  

  const onFinish = (values) => {
    addTask(values);
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
        name="content"
        label="待办事项"
      >
        <Field placeholder="请输入待办事项名称" />
      </Form.Item>

      <Form.Item name="importance" label="优先级" initialValue={3}>
        <Rate />
      </Form.Item>

      <Form.Item 
        name="tag"
        label="类型" 
        rules={[{ required: true, message: '请选择待办事项类型' }]}
        customField>
        <PickerItem placeholder="选择类型" />
      </Form.Item>
      
      <Form.Item
        name="beginTime"
        label="开始时间" 
        customField>
        <TimeItem placeholder="选择开始日期" 
        initdate={initdate}
         />
      </Form.Item>

      <Form.Item
        name="endTime"
        label="结束时间" 
        customField>
        <TimeItem placeholder="选择结束日期" 
        initdate={initdate}
         />
      </Form.Item>
    </Form>
  )
}