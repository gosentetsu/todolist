import React, { useState } from 'react';
import { useRouter } from "next/router";
import {
  Button,
  Field,
  Form,
  Notify
} from 'react-vant';
import NavBarCard from "../components/NavBarCard";

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

export default function ChangeCenter({userId}) {
  const router = useRouter();
  function updateCenter(values){
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    fetch("http://localhost:3000/api/users/"+ userId, options)
      .then((response) => response.json())
      .then((res) => {
        let { message } = res;
        if (message == "success"){
          Notify.show({
            type:'primary',
            message
          });
          router.push("/center");
        }else{
          Notify.show({
            type:'warning',
            message
          });
        }
      });
  }
  return (
    <div>
      <NavBarCard title="修改个人信息" path="/center" />
      <Form
        onFinish={updateCenter}
        footer={
          <div style={{ margin: '16px 8px 0' }}>
            <Button square block nativeType="submit" type="primary" block size = "small">
              提交
            </Button>
          </div>
        }
      >
      
        {/* <Form.Item
          
          label="头像"
          name = "uploader"
          rules={[{ required: true, message: '请选择文件' }]}
          initialValue={[
            {
              url: 'https://img.yzcdn.cn/vant/sand.jpg',
              status: 'done',
              name: '图片名称',
            },
          ]}
        >
          <Uploader />
        </Form.Item> */}
        <Form.Item name="userName" label="用户名" >
          <Field
              required
              placeholder="请输入用户名"
            />
        </Form.Item>
        <Form.Item name="slogan" label="个性签名">
          <Field 
              rows={3} 
              autosize 
              type="textarea"
              placeholder="请输入个性签名"
              maxlength={140} 
              showWordLimit />
        </Form.Item>
      
      </Form>
      
    </div>    
  );
}