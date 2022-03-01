import React from "react";
import { List, Checkbox, Tag } from "antd-mobile";

export default function TodoListCard(props) {
  let { content, header } = props;
  return (
    <div>
      <List mode="card" header={header}>
        {content.map((item) => (
          <List.Item
            key={item.taskId}
            title={
              <Tag color="primary" fill="outline">
                {item.tag}
              </Tag>
            }
            description={item.comment}
            prefix={<Checkbox defaultChecked={item.status} />}
          >
            {item.content}
          </List.Item>
        ))}
      </List>
    </div>
  );
}