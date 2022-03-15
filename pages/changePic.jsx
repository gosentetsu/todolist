import React from 'react';
import { useRouter } from "next/router";
import { Form, Button, Uploader,Notify} from 'react-vant';
import NavBarCard from "../components/NavBarCard";

export default function Connect() {
  const router = useRouter();
  

  function upload(values) {
    const file = values.uploader[0].file;
    const formData = new FormData()
    // console.log(file)
    // console.log(formData)
    formData.append("file", file)
    // console.log(formData)
    const options = {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    };

    fetch("/api/users/upload", options)
      .then((response) => response.json())
      .then((res) => {

        let { message } = res;
        Notify.show({
          message
        })
        if (message === "success") {
          router.push("/center");
        }
      });
  }

  return (
    <div>
      <NavBarCard title="修改头像" path="/center" />
      <Form
        onFinish={upload}
        footer={
          <div style={{ margin: '16px 16px 0' }}>
            <Button round nativeType="submit" type="primary" block size = "small">
              提交
            </Button>
          </div>
        }
      >
      
        <Form.Item
          name="uploader"
          label="新头像"
          rules={[{ required: true, message: '请选择文件' }]}
        >
          <Uploader maxCount = {1}/>
        </Form.Item>
      
      </Form>
      
    </div>    
  );
}