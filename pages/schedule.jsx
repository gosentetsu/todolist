import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button } from 'react-vant';
import Layout from "../components/Layout";
import AgendaScreen from "../components/AgendaScreen"
import TodoListCard from "../components/TodoListCard"
export default function Schedule() {
  const [date, useDate] = useState(new Date(new Date()).toLocaleDateString());
  const router = useRouter();
  const getTasks = () => {
    fetch("http://localhost:3000/api/tasks/U_YEAu7W",{method:'GET'})
    .then((response) => response.json()) 
    .then((responseData) => {
      console.log(responseData); 
    })
  }
  getTasks();

  const changeDate = (date) => {
    useDate(date.toLocaleDateString());
  }

  return (
    <Layout>
      <AgendaScreen changeDate={changeDate} />
      {/* <TodoListCard content={} header={date} /> */}
      <Button type="primary" block round onClick={()=>{router.push({pathname:"/add", query:{initdate: date},})}}>
        添加待办
      </Button>
    </Layout>
    
  );
}
