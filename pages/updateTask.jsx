import React from "react";
import { useRouter } from "next/router";
import { Form, Button, Field, Rate, Toast } from "react-vant";
import { PickerItem, TimeItem } from "../components/CombinedItems.tsx";
import jsCookie from "js-cookie";
import _ from "lodash";

export default function UpdateTask() {
  const [form] = Form.useForm();
  const userId = jsCookie.get("userId");
  const initdate = new Date().toLocaleDateString();
  const router = useRouter();
  const item = router.query;
  console.log(item);

  const updateTask = (values) => {
    console.log(values);
    values.beginTime = values.beginTime?.valueOf() || item.beginTime?.valueOf();
    values.endTime = values.endTime?.valueOf() || item.endTime?.valueOf();
    if (values.beginTime > values.endTime) {
      Toast.fail("结束时间应大于等于开始时间");
      return;
    }

    const updateBody = _.omitBy(values, _.isUndefined);
    console.log(updateBody);
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskId: item.taskId,
        ...updateBody,
      }),
    };
    fetch("/api/tasks/" + userId, options)
      .then((response) => response.json())
      .then((res) => {
        let { message } = res;
        Toast({
          message: message,
          forbidClick: true,
        });
        if (message === "success") {
          router.push("/home");
        }
      });
  };

  const onFinish = (values) => {
    updateTask(values);
  };
  return (
    <Form
      form={form}
      onFinish={onFinish}
      footer={
        <div style={{ margin: "16px 16px 0" }}>
          <Button
            round
            nativeType="submit"
            type="primary"
            block
            onClick={() => {}}
          >
            提交
          </Button>
        </div>
      }
    >
      <Form.Item name="content" label="待办事项">
        <Field placeholder={item.content} />
      </Form.Item>

      <Form.Item
        name="importance"
        label="优先级"
        initialValue={parseInt(item.importance)}
      >
        <Rate />
      </Form.Item>

      <Form.Item name="tag" label="类型" customField>
        <PickerItem placeholder={item.tag} />
      </Form.Item>

      <Form.Item name="beginTime" label="开始时间" customField>
        <TimeItem
          placeholder={new Date(+item.beginTime).toLocaleString()}
          initdate={initdate}
        />
      </Form.Item>

      <Form.Item name="endTime" label="结束时间" customField>
        <TimeItem
          placeholder={new Date(+item.endTime).toLocaleString()}
          initdate={initdate}
        />
      </Form.Item>
    </Form>
  );
}
