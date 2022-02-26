import React, { useState } from "react";
import { List, Checkbox, Tag } from "antd-mobile";
import Layout from "../components/Layout";
import TodoListCard from "../components/TodoListCard";
export default function Home() {
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
  const testItem2 = { ...testItem };
  testItem2.status = true;
  return (
    <Layout>
      <TodoListCard content={Array(3).fill(testItem)} header="未完成的任务" />
      <TodoListCard content={Array(3).fill(testItem2)} header="已完成的任务" />
    </Layout>
  );
}
