import React, { useState } from "react";
import { useRouter } from "next/router";
import { Badge, TabBar } from "antd-mobile";
import {
  CalendarOutline,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";
export default function Layout(props) {
  const router = useRouter();
  function handleRoute(params) {
    console.log("test");
  }
  const tabs = [
    {
      key: "/home",
      title: "我的待办",
      icon: <UnorderedListOutline />,
      badge: "5",
    },
    {
      key: "/schedule",
      title: "我的日程",
      icon: <CalendarOutline />,
    },
    {
      key: "/center",
      title: "个人中心",
      icon: <UserOutline />,
    },
  ];

  return (
    <div>
      <main>{props.children}</main>
      <TabBar className="bar" onChange={(key) => router.push(key)}>
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
