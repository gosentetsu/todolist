import React from "react";
import { useRouter } from "next/router";
import { TabBar } from "antd-mobile";
import {
  CalendarOutline,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";
export default function Layout(props) {
  const router = useRouter();
  const tabs = [
    {
      key: "/home",
      title: "我的待办",
      icon: <UnorderedListOutline />,
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
      <TabBar
        style = {{background : 'linear-gradient(to top, #fad0c4 0%, #fad0c4 1%, #ffd1ff 100%)', color:'white'}}
        className="bar"
        onChange={(key) => router.push(key)}
        activeKey={router.pathname}
      >
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
