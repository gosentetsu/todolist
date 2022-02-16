import React from "react";
import { Arrow, Edit } from '@react-vant/icons';
import { Card, Image, Button, Toast, Space, Cell } from 'react-vant';
import Layout from "../components/Layout";
export default function Center() {
  const users = {
      userId: "user_01",
      userName: "coderfan",
      password: "coderfan@123",
      slogan: "hello, our todolist project and the ant design mobile conponent",
      picUrl: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
 }
  
  return (
    <Layout>
      <Card round style={{ marginBottom: 20 }}>
        <Card.Cover onClick={() => Toast.info('点击了Cover区域')}>
          <Image src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632/274faa127009547.61390144590a7.png" />
        </Card.Cover>
        <Card.Header extra={<Arrow />} onClick={() => Toast.info('点击了Header区域')}>
          {users.userName}
        </Card.Header>
        <Card.Body onClick={() => Toast.info('点击了Body区域')} style={{
          height: '10vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {users.slogan}
        </Card.Body>
        <Card.Footer>
          <Space>
            <Button
              type = 'primary'
              icon={<Edit  />}
              size="small"
            >
            </Button>
          </Space>
        </Card.Footer>
      </Card>

      <Cell title="使用帮助" isLink />
      <Cell title="联系客服" isLink />
    </Layout>
  );
}
