import React from "react";
import { List, Checkbox, Tag, Space, Empty } from "antd-mobile";
import {
  TagOutline,
  CalendarOutline,
  StarOutline,
  AddCircleOutline,
} from "antd-mobile-icons";
export default function TodoListCard(props) {
  let { content, header, onItemChange, addAction } = props;
  return (
    <div>
      <List mode="card" header={header}>
        {content.length === 0 && (
          <Empty description="暂无数据" imageStyle={{ height: "1rem" }} />
        )}
        {content.map((item) => (
          <List.Item
            key={item.taskId}
            title={
              <Space>
                <Tag color="success" fill="solid">
                  <TagOutline />
                  {item.tag}
                </Tag>
                <Tag color="warning" fill="solid">
                  <StarOutline />
                  {item.importance}
                </Tag>
                <Tag color="primary" fill="outline">
                  <CalendarOutline />
                  {new Date(item.beginTime).toLocaleDateString() +
                    " - " +
                    new Date(item.endTime).toLocaleDateString()}
                </Tag>
              </Space>
            }
            description={item.comment}
            prefix={
              <Checkbox
                defaultChecked={item.status}
                onChange={(val) => onItemChange(item, val)}
              />
            }
            extra={<AddCircleOutline onClick={() => addAction(item)} />}
          >
            {item.content}
          </List.Item>
        ))}
      </List>
    </div>
  );
}
