import React, { useState } from "react";
import { Badge, TabBar } from "antd-mobile";
import {
  CalendarOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";
export default function Layout(props) {
  const tabs = [
    {
      key: "todo",
      title: "我的待办",
      icon: <UnorderedListOutline />,
      badge: "5",
    },
    {
      key: "calendar",
      title: "我的日程",
      icon: <CalendarOutline />,
    },
    {
      key: "personalCenter",
      title: "个人中心",
      icon: <UserOutline />,
    },
  ];

  return (
    <div>
      <main>{props.children}</main>
      <TabBar className="bar" defaultActiveKey={props.defaultActiveKey}>
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
