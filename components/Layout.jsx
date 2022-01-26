import React, { useState } from "react";
import { Badge, TabBar } from "antd-mobile";
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";
export default function Layout(props) {
  const tabs = [
    {
      key: "home",
      title: "首页",
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: "todo",
      title: "我的待办",
      icon: <UnorderedListOutline />,
      badge: "5",
    },
    {
      key: "message",
      title: "我的消息",
      icon: (active) => (active ? <MessageFill /> : <MessageOutline />),
      badge: "99+",
    },
    {
      key: "personalCenter",
      title: "个人中心",
      icon: <UserOutline />,
    },
  ];

  return (
    <div className="app">
      <main className="content">{props.children}</main>
      <TabBar className="bottom" defaultActiveKey={props.defaultActiveKey}>
        {tabs.map((item) => (
          <TabBar.Item
            key={item.key}
            icon={item.icon}
            title={item.title}
            badge={item.badge}
          />
        ))}
      </TabBar>
    </div>
  );
}
