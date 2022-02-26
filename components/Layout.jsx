import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Badge, TabBar } from "antd-mobile";
import {
  CalendarOutline,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";
import { useSelector } from "react-redux";
export default function Layout(props) {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  // useEffect(() => {
  //   if (user.loggedIn === false) {
  //     router.push("/login");
  //   }
  // });
  const tabs = [
    {
      key: "/home",
      title: "我的待办",
      icon: <UnorderedListOutline />,
      badge: "3",
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
