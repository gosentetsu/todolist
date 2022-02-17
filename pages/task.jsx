import React, { useState } from "react";
import { List, Checkbox, Tag, Button } from "antd-mobile";
import { useRouter } from "next/router"
export default function Task() {
  const router = useRouter();
  const testlists = [
    {
      taskId: "taskId",
      content: "待办事项内容",
      comment: "备注",
      tag: "标签",
      status: true,
      beginTime: "beginDate",
      endTime: "endDate",
      coUsers: [],
    },
    {
      taskId: "taskId2",
      content: "待办事项内容",
      comment: "备注",
      tag: "标签",
      status: true,
      beginTime: "beginDate",
      endTime: "endDate",
      coUsers: [],
    },
    {
      taskId: "taskId3",
      content: "待办事项内容",
      comment: "备注",
      tag: "标签",
      status: true,
      beginTime: "beginDate",
      endTime: "endDate",
      coUsers: [],
    },
  ];
  const [lists, setList] = useState(testlists);
  return (
    <>
      <List mode="card" header="未完成待办事项">
        {lists.map((item) => (
          <List.Item
            key={item.taskId}
            title={
              <Tag color="primary" fill="outline">
                {item.tag}
              </Tag>
            }
            description={item.comment}
            prefix={<Checkbox />}
          >
            {item.content}
          </List.Item>
        ))}
      </List>
      <List mode="card" header="已完成待办事项">
        {lists.map((item) => (
          <List.Item
            className="dimmed"
            key={item.taskId}
            title={
              <Tag color="primary" fill="outline">
                {item.tag}
              </Tag>
            }
            description={item.comment}
            prefix={<Checkbox defaultChecked={true} />}
          >
            {item.content}
          </List.Item>
        ))}
      </List>
      <Button block color='primary' size='large' onClick={()=>{router.push("/add")}}>
          添加待办事项
      </Button>
    </>
  );
}