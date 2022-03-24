import React, { useState } from "react";
import { List, Checkbox, Tag, Space, Empty, Modal, Toast } from "antd-mobile";
import { Dialog, Field } from "react-vant";
import {
  TagOutline,
  CalendarOutline,
  StarOutline,
  AddCircleOutline,
  AddOutline,
  TeamOutline,
} from "antd-mobile-icons";
import jsCookie from "js-cookie";
export default function TodoListCard(props) {
  let { content, header, onItemChange } = props;
  const [visible, setVisible] = useState(false);
  const [tempTaskId, setTempTaskId] = useState();
  const [tempName, setTempName] = useState();
  const addCooperatorList = (name) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId: tempTaskId, coworkerUserName: name }),
    };
    fetch("/api/tasks/coworker", options)
      .then((response) => response.json())
      .then((res) => {
        let { message } = res;
        Toast.show({
          content: message,
        });
        if (message === "success") {
        }
      });
  };
  const handleAddCoworker = (item) => {
    setVisible(true);
    setTempTaskId(item.taskId);
  };
  const handleUpdateItem = (item) => {
    console.log(item);
    /**
     * invoke add item function here
     */
  };
  const handleDeleteItem = (item) => {
    console.log(item.taskId);
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: item.taskId,
    };

    fetch("/api/tasks/" + jsCookie.get("userId"))
      .then((response) => response.json())
      .then((response) => {
        console.log("deleted");
        Toast.show({
          content: response.message,
        });
      })
      .catch((err) => console.error(err));
  };
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
                id="checkbox"
                defaultChecked={item.status}
                onChange={(val) => onItemChange(item, val)}
              />
            }
            arrow
            onClick={(e) => {
              if (e.target.className !== "adm-list-item-content-main") return;
              Modal.show({
                closeOnAction: true,
                closeOnMaskClick: true,
                header: (
                  <Space wrap>
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
                    <Tag color="primary" fill="outline">
                      <TeamOutline />
                      合作者:
                      {item.coworkers.map((i) => (
                        <Tag color="primary" fill="solid" key={i.userId}>
                          {i.userName}
                        </Tag>
                      ))}
                    </Tag>
                  </Space>
                ),
                title: item.content,
                actions: [
                  {
                    key: "delete",
                    text: "删除该待办",
                    onClick: () => handleDeleteItem(item),
                  },
                  {
                    key: "update",
                    text: "更新待办",
                    onClick: () => handleUpdateItem(item),
                  },
                  {
                    key: "addCoworer",
                    text: "添加合作者",
                    onClick: () => handleAddCoworker(item),
                  },
                ],
              });
            }}
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
          rightIcon={<AddOutline />}
          onClickRightIcon={() => {
            addCooperatorList(tempName);
          }}
          onChange={(value) => {
            setTempName(value);
          }}
        />
      </Dialog>
    </div>
  );
}
