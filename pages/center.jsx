import React from "react";
import { useRouter } from "next/router";
import {  Edit } from '@react-vant/icons';
import { Card, Image, Button, Notify, Space, Cell, Dialog } from 'react-vant';
import Layout from "../components/Layout";

// TODO need a better way to handle global userId
export async function getServerSideProps({ req }) {
  const { userId } = req.cookies;

  //TODO do not use abslute path here, not an efficient way to call internal API route here

  const res = await fetch("http://localhost:3000/api/users/" + userId, {
    headers: {
      Cookie: req.headers.cookie,
    },
  });
  const data = await res.json();
  return {
    props: { data, userId }, // will be passed to the page component as props
  };
}

export default function Center({data, userId}) {
//  const {userId} = req.cookies;
 const router = useRouter();
 function deleteUser(){
  Dialog.confirm({
    title: '确认注销',
    message: '注销后，所有的数据信息都将清空，是否继续？',
  })
    .then(() => {
      console.log('confirm');
      fetch("http://localhost:3000/api/users/" + userId,{method:'DELETE'})
      .then((response) => response.json()) 
      .then((responseData) => {
        // console.log(responseData.entity);
        let { message } = responseData;
        Notify.show({
          type:'primary',
          message
        });
        router.push("/login")
      })
    })
    .catch(() => {
      console.log('catch');
    })
  
 }

 function logoutUser(){
  fetch("http://localhost:3000/api/users/logout",{method:'GET'})
  .then((response) => response.json()) 
  .then((responseData) => {
    // console.log(responseData.entity);
    console.log(responseData)
    router.push("/login")
  })
 }

 return (
    <Layout >
      <Card style={{ marginBottom: 20 }} style = {{background : 'linear-gradient(-225deg, #9EFBD3 0%, #57E9F2 48%, #45D4FB 100%)', color:'white'}}>
        <Card.Cover border>
          
          <Cell
            style = {{background : 'linear-gradient(-225deg, #9EFBD3 0%, #57E9F2 48%, #45D4FB 100%)', color:'white'}}
            size = "large"
            title= {data.entity.userName}
            label={"ID：" + data.entity.userId}
            icon={
              <Image
                width={65}
                height={65}
                src={data.entity.picUrl}
                onClick = {()=>{router.push("/changePic")}}
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
          {data.entity.slogan}
        </Card.Body>
        <Card.Footer border>
          <Space>
            <Button round size="small" icon = {<Edit color="black" fontSize = "40px"/> } iconPosition="left" onClick={()=>{router.push("/changeCenter")}}>
              修改
            </Button>
            
          </Space>
        </Card.Footer>
      </Card>
      

      <Cell title="修改密码" isLink onClick={()=>{router.push("/changePwd")}} style={{ marginTop: 15 }}/>
      <Cell title="使用帮助" isLink onClick={()=>{router.push("/help")}}/>
      <Cell title="问题反馈" isLink onClick={()=>{router.push("/connect")}}/>

      <div style={{ margin: '15px 8px 0' }}>
        <Button square block size = "small"  onClick={logoutUser} type = "warning" color = "linear-gradient(to right, #fa709a 0%, #fee140 100%)">
          退出登录
        </Button>
      </div>

      <div style={{ margin: '10px 8px 0' }}>
        <Button color="linear-gradient(to right, #ff9569 0%, #e92758 100%)" square block size = "small" onClick = {deleteUser}>
          注销账户
        </Button>
      </div>
      
    </Layout>
  );
}
