import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import TodoListCard from "../components/TodoListCard";
import _ from "lodash";
// TODO need a better way to handle global userId
export async function getServerSideProps({ req }) {
  const { userId } = req.cookies;

  //TODO do not use abslute path here, not an efficient way to call internal API route here

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

export default function Home({ data, userId }) {
  const [lists, setLists] = useState(data.list);

  function getAlltasks() {
    fetch("/api/tasks/" + userId)
      .then((response) => response.json())
      .then((response) => {
        if (response.message === "success") setLists(response.list);
      })
      .catch((err) => console.error(err));
  }

  function changeTaskStatus(item, val) {
    item = _.pick(item, [
      "taskId",
      "content",
      "importance",
      "tag",
      "status",
      "beginTime",
      "endTime",
    ]);
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
  return (
    <Layout>
      <TodoListCard
        content={lists.filter((i) => i.status === false)}
        onItemChange={changeTaskStatus}
        header="未完成的任务"
      />
      <TodoListCard
        onItemChange={changeTaskStatus}
        content={lists.filter((i) => i.status === true)}
        header="已完成的任务"
      />
    </Layout>
  );
}
