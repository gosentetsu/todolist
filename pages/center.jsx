import React from "react";
import { useRouter } from "next/router";
import { Arrow, Edit } from '@react-vant/icons';
import { Card, Image, Button, Toast, Space, Cell, Divider } from 'react-vant';
import Layout from "../components/Layout";
export default function Center() {
  const users = {
      userId: "user_01",
      userName: "coderfan",
      password: "coderfan@123",
      slogan: "hello, our todolist project and the ant design mobile conponent",
      picUrl: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
 }
 const router = useRouter();
 return (
    <Layout>
      <Card style={{ marginBottom: 20 }}>
        <Card.Cover onClick={() => Toast.info('点击了Cover区域')} border>
          
          <Cell
            style={{ marginTop: 15 }}
            size = "large"
            title="coderfan"
            label="ID: 20220316"
            icon={
              <Image
                width={65}
                height={65}
                src="https://cdn.jsdelivr.net/gh/3lang3/react-vant@main/public/home-music-card-1.jpg"
              />
            }
          />
        </Card.Cover>
        <Card.Header onClick={() => Toast.info('点击了Header区域')} border>
          个性签名
        </Card.Header>
        <Card.Body
          style={{
            height: '20vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          我是小妖怪，逍遥又自在
        </Card.Body>
        <Card.Footer border>
          <Space>
            <Button round size="small" icon = {<Edit color="black" fontSize = "40px"/> } iconPosition="left" onClick={()=>{router.push("/changeCenter")}}>
              修改
            </Button>
            
          </Space>
        </Card.Footer>
      </Card>
      

      <Cell title="修改密码" isLink onClick={()=>{router.push("/changePwd")}}/>
      <Cell title="使用帮助" isLink onClick={()=>{router.push("/help")}}/>
      <Cell title="问题反馈" isLink onClick={()=>{router.push("/connect")}}/>

      <div style={{ margin: '20px 0px 0' }}>
        <Button square block size = "small"  onClick={()=>{router.push("/login")}}>
          退出登录
        </Button>
      </div>

      <div style={{ margin: '8px 0px 0' }}>
        <Button square block size = "small" >
          注销账户
        </Button>
      </div>
      
    </Layout>
  );
}
