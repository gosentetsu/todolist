import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, Space, Typography } from 'react-vant';
import Layout from "../components/Layout";
import AgendaScreen from "../components/AgendaScreen"
import TodoListCard from "../components/TodoListCard"

export async function getServerSideProps({ req }) {
  const { userId } = req.cookies;
  const res = await fetch("http://localhost:3000/api/tasks/" + userId, {
    headers: {
      Cookie: req.headers.cookie,
    },
  });
  const data = await res.json();
  if (data.message !== "success") {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  return {
    props: { data, userId }, // will be passed to the page component as props
  };
}

export default function Schedule({ data, userId }) {
  const [date, useDate] = useState(new Date().toLocaleDateString());
  const [lists, setLists] = useState(data.list);
  const taskDays = new Set;
  const router = useRouter();
  function getAlltasks() {
    fetch("/api/tasks/" + userId)
      .then((response) => response.json())
      .then((response) => {
        if (response.message === "success") setLists(response.list);
      })
      .catch((err) => console.error(err));
  }
  function changeTaskStatus(item, val) {
    item.status = val;
    const options = {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(item),
    };
    fetch("/api/tasks/" + userId, options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .then(getAlltasks())
      .catch((err) => console.error(err));
  }

  const changeDate = (date) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useDate(date.toLocaleDateString());
  }

  const judgeTheSameDate = (beginTime,endTime,date) => {
    date = new Date(date.split('/').join('-'));
    const min = date.valueOf();
    const max = min + 86400000;
    if (beginTime >= max || endTime < min) {
      return false;
    } else {
      return true;
    }
  }
  for (const i of lists) {
    let temp = i.beginTime;
    while (temp <= i.endTime) {
      const taskDay = new Date(temp).toLocaleDateString();
      taskDays.add(taskDay);
      temp += 86400000;
    }
    taskDays.add(new Date(i.endTime).toLocaleDateString());
  }
  return (
    <Space direction="vertical">
      <AgendaScreen changeDate={changeDate} taskDays={taskDays} />
      <Typography.Title level={2} center="true">{date}</Typography.Title>
      <TodoListCard
        content={lists
          .filter((i)=> judgeTheSameDate(i.beginTime, i.endTime, date))
          .filter((i) => i.status === false)
          .sort((a, b)=>(a.endTime*(10-a.importance)-b.endTime*(10-b.importance)))}
        onItemChange={changeTaskStatus}
        header="未完成的任务"
      />
      <TodoListCard
        onItemChange={changeTaskStatus}
        content={lists
          .filter((i)=> judgeTheSameDate(i.beginTime, i.endTime, date))
          .filter((i) => i.status === true)}
        header="已完成的任务"
      />
      <div style={{ margin: '4px 8px 0' }}>
        <Button type="primary" block square size = "small"  onClick={()=>{router.push({pathname:"/add", query:{initdate: date},})}}>
          添加待办
        </Button>
      </div>
      
      <br></br>
      <br></br>
      <Layout />
    </Space>
    
  );
}
