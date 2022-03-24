import React, {useState} from "react";
import { List, Checkbox, Tag, Space, Empty } from "antd-mobile";
import { Dialog, Field, Toast } from 'react-vant';
import {
  TagOutline,
  CalendarOutline,
  StarOutline,
  AddCircleOutline,
  AddOutline
} from "antd-mobile-icons";
export default function TodoListCard(props) {
  let { content, header, onItemChange } = props;
  const [visible, setVisible] = useState(false);
  const [tempTaskId, setTempTaskId] = useState();
  const [tempName, setTempName] = useState()
  const addCooperatorList = (name) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({taskId:tempTaskId, coworkerUserName:name}),
    };
    fetch("/api/tasks/coworker", options)
      .then((response) => response.json())
      .then((res) => {
        let { message } = res;
        Toast({
          message: message,
          forbidClick: true,
        });
        if (message === "success") {
        }
      });
  }
  const addAction = (item) => {
    setVisible(true);
    setTempTaskId(item.taskId);
  }
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
      <Dialog
        visible={visible}
        title="添加合作者"
        onConfirm={() => {
          setVisible(false);
        }}
      >
        <Field
      center
      clearable
      label="合作者"
      placeholder="请输入合作者username"
      rightIcon = {<AddOutline />}
      onClickRightIcon={()=>{addCooperatorList(tempName)}}
      onChange={(value)=>{setTempName(value)}}
    />
  </Dialog>
    </div>
  );
}
