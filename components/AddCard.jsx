import React, { useState } from "react";
import { useRouter } from "next/router";
import { Form, Button, Field, Rate, Toast } from 'react-vant';
import { CalendarItem, PickerItem, TimeItem } from '../components/CombinedItems.tsx';



export default function AddCard(props){
  const [form] = Form.useForm();
  const { initdate,userId } = props;
  const router = useRouter();
  const [minHour, setMinHour] = useState("00");
  const [minMinute, setMinMinute] = useState("00");
  const [maxHour, setMaxHour] = useState("23");
  const [maxMinute, setMaxMinute] = useState("59");
  const [tempMinMinute, setTempMinMinute] = useState("00");
  const [tempMaxMinute, setTempMaxMinute] = useState("59");

  const addTask = (values) => {
    values.beginTime = new Date(values.calendar.split('/').join('-') + ' ' + values.beginTime);
    values.endTime = new Date(values.calendar.split('/').join('-') + ' ' + values.endTime);
    const { calendar, ...rest } = values;
    console.log(rest)
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rest),
    };
    fetch("/api/tasks/" + userId, options)
      .then((response) => response.json())
      .then((res) => {
        let { message } = res;
        Toast.loading({
          message: message,
          forbidClick: true,
        });
        if (message === "success") {
          router.push("/schedule");
        }
      });
  }

  const changeMinTime = (val) => {
    setMinHour(val.slice(0,2));
    setMinMinute(val.slice(3,5));
  }

  const changeMaxTime = (val) => {
    setMaxHour(val.slice(0,2));
    setMaxMinute(val.slice(3,5));
  }

  const changeMaxMinute = (val) => {
    setMaxMinute(val);
  }

  const changeMinMinute = (val) => {
    setMinMinute(val);
  }

  const changeTempMaxMinute = (val) => {
    setTempMaxMinute(val);
  }

  const changeTempMinMinute = (val) => {
    setTempMinMinute(val);
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
        name="calendar"
        label="日期" 
        initialValue={initdate}
        customField>
        <CalendarItem placeholder="选择日期" />
      </Form.Item>
      
      <Form.Item
        name="beginTime"
        label="开始时间" 
        customField>
        <TimeItem placeholder="选择开始日期" minHour="00" minMinute="00" maxHour={maxHour} maxMinute={maxMinute} changeTime={changeMinTime} changeMinute={changeMaxMinute} tag="1" changeTempTime={changeTempMinMinute} temp={tempMaxMinute} />
      </Form.Item>

      <Form.Item
        name="endTime"
        label="结束时间" 
        customField>
        <TimeItem placeholder="选择结束日期" minHour={minHour} minMinute={minMinute} maxHour="23" maxMinute="59" changeTime={changeMaxTime} changeMinute={changeMinMinute} tag="0" changeTempTime={changeTempMaxMinute} temp={tempMinMinute} />
      </Form.Item>

    </Form>
  )
}