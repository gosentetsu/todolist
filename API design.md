# 数据库设计
## User
- taskIds为待办事项列表的id，可以通过用户id查到该用户所有的待办事项id，再从Task表中查到这些待办事项的详细信息

```javascript
{
  userId: String,
  userName: String,
  password: String,
  slogan: String,  //个性签名
  picUrl: String, //头像图片的url
  taskIds: []
}
```

## Task
- userIds为待办事项列表的id，可以查询该待办事项的所有参与者，在User表中查到这些参与者的详细信息

```javascript
{
  taskId: String,
  content: String,
  comment: String,  //备注，标注待办事项的重要性
  tag: String,  //标签，按标签给待办事项分类
  status: String,  //状态，待办事项是否完成
  beginTime: Date,
  endTime: Date,
  userIds: []
}
```

# 接口设计

- `GET` `/api/users/userId`

  > 根据userId查找用户

  - response
  ```javascript
  {
    code: 200,
    data: {
      message: "success",
      entity: {
        userId: String,
        userName: String,
        slogan: String,
        picUrl: String
      }
    }
  }
  ```

- `PUT` `/api/users/userId`

  > 修改userName、password或slogan

  - body
  ```javascript
  {
    slogan: String,  // 可选
    userName: String,  // 可选
    password: String,  // 可选，必须和newPass同时出现
    newPass: String
  }
  ```

  - response
  ```javascript
  {
    code: 200,
    data: {
      message: "success"
    }
  }
  ```

- `POST` `/api/users`

  > 往数据库中添加用户

  - body
  ```javascript
  {
    userName: String,
    password: String
  }
  ```

  - response
  ```javascript
  {
    code: 200,
    data: {
      message: "success",
      entity: {
        userId: String,
        //token or sessinID
      }
    }
  }
  ```

- `GET` `/api/tasks/userId`

  > 根据userId查找用户所有的task

  - response
  ```javascript
  {
    code: 200,
    data: {
      message: "success",
      list: [
        {
          taskId: String,
          content: String,
          comment: String,
          tag: String,
          status: String,
          beginTime: Date,
          endTime: Date,
          userIds: []
        },
        …
      ]
    }
  }
  ```

- `POST` `/api/tasks/userId`

  > 往数据库中添加待办事项

  - body
  ```javascript
  {
    content: String,
    comment: String,
    tag: String,
    beginTime: Date,
    endTime: Date,
  }
  ```

  - response
  ```javascript
  {
    code: 200,
    data: {
      message: "success",
      entity: {
        taskId: String
      }
    }
  }
  ```

- `DELETE` `/api/tasks/userId`

  > 从数据库中删除待办事项

  - body
  ```javascript
  {
    taskId: String,
  }
  ```

  - response
  ```javascript
  {
    code: 200,
    data: {
      message: "success"
    }
  }
  ```

- `PUT` `/api/tasks`

  > 修改task的各个值，所有属性均为可选值，在需要更新时添加

  - body
  ```javascript
  {
    taskId: String,
    content: String,
    comment: String,
    tag: String,
    status: String,
    beginTime: Date,
    endTime: Date,
  }
  ```

  - response
  ```javascript
  {
    code: 200,
    data: {
      message: "success"
    }
  }
  ```

- TODO
  - 用户上传头像的api
  - 待办事项增加和删除合作者的api