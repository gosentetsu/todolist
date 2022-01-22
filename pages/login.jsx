import React, { useState } from "react";
import { Input, List } from "antd-mobile";

export default () => {
  const [value, setValue] = useState("");
  return (
    <>
      <List
        style={{
          "--prefix-width": "6em",
        }}
      >
        <List.Item title="用户名">
          <Input placeholder="请输入用户名" clearable />
        </List.Item>
        <List.Item title="密码">
          <Input placeholder="请输入密码" clearable type="password" />
        </List.Item>
      </List>
    </>
  );
};
