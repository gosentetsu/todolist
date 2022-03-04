import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button } from 'react-vant';
import Layout from "../components/Layout";
import AgendaScreen from "../components/AgendaScreen"
import TodoListCard from "../components/TodoListCard"
export default function Schedule() {
  const [date, useDate] = useState(new Date(new Date()).toLocaleDateString());
  const router = useRouter();
  const testItem = {
    taskId: "taskId",
    content: "待办事项内容",
    comment: "备注",
    tag: "标签",
    status: false,
    beginTime: "beginDate",
    endTime: "endDate",
    coUsers: [],
  };
  const changeDate = (date) => {
    useDate(date.toLocaleDateString());
  }

  return (
    <Layout>
      <AgendaScreen changeDate={changeDate} />
      <TodoListCard content={Array(3).fill(testItem)} header={date} />
      <Button type="primary" block round onClick={()=>{router.push({pathname:"/add", query:{initdate: date},})}}>
        添加待办
      </Button>
    </Layout>
    
  );
}
