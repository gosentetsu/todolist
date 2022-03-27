import React, { useState } from "react";
import {
  List,
  Checkbox,
  Tag,
  Space,
  Empty,
  Modal,
  Toast,
  Form,
  Input,
  DatePicker,
} from "antd-mobile";
import {
  TagOutline,
  CalendarOutline,
  StarOutline,
  AddCircleOutline,
  AddOutline,
  TeamOutline,
} from "antd-mobile-icons";
import { Dialog, Field } from "react-vant";
import jsCookie from "js-cookie";
import add from "../pages/add";
import { useRouter } from "next/router";

export default function TodoListCard(props) {
  let { content, header, onItemChange, onModalClose } = props;
  const [visible, setVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [tempTaskId, setTempTaskId] = useState();
  const [tempName, setTempName] = useState();

  const router = useRouter();
  const addCooperatorList = (name) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId: tempTaskId, coworkerUserName: name }),
    };
    fetch("/api/tasks/coworker", options)
      .then((response) => response.json())
      .then((response) => {
        Toast.show({
          content: response.message,
        });
      });
  };
  const handleAddCoworker = (item) => {
    setVisible(true);
    setTempTaskId(item.taskId);
  };
  const handleUpdateItem = (item) => {
    console.log("update---");
    console.log(item);
    router.push({
      pathname: "/updateTask",
      query: item,
    });
  };
  const handleDeleteItem = (item) => {
    console.log(item.taskId);
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId: item.taskId }),
    };

    fetch("/api/tasks/" + jsCookie.get("userId"), options)
      .then((response) => response.json())
      .then((response) => {
        console.log("deleted");
        console.log(response.message);
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
              // Modal
              if (e.target.className !== "adm-list-item-content-main") return;
              Modal.show({
                closeOnAction: true,
                closeOnMaskClick: true,
                onClose: onModalClose,
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
      {/* mask area */}
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
