import React , {useState} from "react";
import { useRouter } from "next/router";
import {  Edit } from '@react-vant/icons';
import { Card, Image, Button, Toast, Space, Cell, Divider } from 'react-vant';
import Layout from "../components/Layout";
export default function Center({req}) {
//  const {userId} = req.cookies;
 const [users, setUsers] = useState({})
 const newUsers = {}
 const getUser = () =>{
  fetch("http://localhost:3000/api/users/user_01",{method:'GET'})
  .then((response) => response.json()) 
  .then((responseData) => {
    // console.log(responseData.entity);
    newUsers = responseData.entity;
   
    setUsers(newUsers)
    
  })
 }
//  getUser();

 const router = useRouter();
 return (
    <Layout>
      <Card style={{ marginBottom: 20 }}>
        <Card.Cover onClick={() => Toast.info('点击了Cover区域')} border>
          
          <Cell
            style={{ marginTop: 15 }}
            size = "large"
            title= {users.userName}
            label={"ID：" + users.userId}
            icon={
              <Image
                width={65}
                height={65}
                src={users.picUrl}
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
          {users.slogan}
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
