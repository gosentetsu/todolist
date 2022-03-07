# 数据库设计

## User

```javascript
{
  userId: String,  // U_开头，后面是随机6位字母+数字
  userName: String,
  password: String,
  slogan: String,  //个性签名
  picUrl: String //头像图片的url
}
```

## Task

```javascript
{
  taskId: String,  // T_开头，后面是随机6位字母+数字
  content: String,
  comment: String,  //备注，标注待办事项的重要性
  tag: String,  //标签，按标签给待办事项分类
  status: Boolean,  //状态，待办事项是否完成
  beginTime: Date,
  endTime: Date
}
```

## Relation

> user 和 task 的关系表，n:m 关系

```javascript
{
  userId: String,
  taskId: String
}
```

# 接口设计

- 返回的 message 为 null 时，均是因为请求方法错误，以下不重复指出

- 返回的 message 为 please sign in 时，是因为未提供 token 或 token 过期（有效期设定为 24 小时），以下不重复指出

- `POST` `/api/users/login`

  > 认证并授权用户

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
        userId: String
      }
    }
  }
  {
    code: 400,
    data: {
      message: "the user doesn't exist"  // 提供的userId有问题
    }
  }
  {
    code: 400,
    data: {
      message: "password error"  // 提供的password有问题
    }
  }
  ```

- `GET` `/api/users/userId`

  > 根据 userId 查找用户

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
  {
    code: 400,
    data: {
      message: "the user doesn't exist"  // 提供的userId有问题
    }
  }
  ```

- `PUT` `/api/users/userId`

  > 修改 userName、password 或 slogan

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
  {
    code: 400,
    data: {
      message: "the user doesn't exist"  // 提供的userId有问题
    }
  }
  {
    code: 400,
    data: {
      message: "password error"  // 旧密码输入错误
    }
  }
  ```

- `POST` `/api/users`

  > 往数据库中添加用户，用户注册的接口，不返回 token，因此用户注册完毕后要进行登录操作

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
        userId: String
      }
    }
  }
  {
    code: 400,
    data: {
      message: "the user name already exists"  // userName已经注册过
    }
  }
  ```

- `GET` `/api/tasks/userId`

  > 根据 userId 查找用户所有的 task

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
          status: Boolean,
          beginTime: Date,
          endTime: Date
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
    endTime: Date
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
    taskId: String;
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
  {
    code: 400,
    data: {
      message: "delete failed"  // 各种原因导致了删除出错
    }
  }
  ```

- `PUT` `/api/tasks/userId`

  > 修改 task 的各个值，所有属性均为可选值，在需要更新时添加

  - body

  ```javascript
  {
    taskId: String,
    content: String,
    comment: String,
    tag: String,
    status: Boolean,
    beginTime: Date,
    endTime: Date
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
  {
    code: 400,
    data: {
      message: "taskId is required"  // 未提供taskId
    }
  }
  {
    code: 400,
    data: {
      message: "update failed"  // 信息更新出错
    }
  }
  ```

- `POST` `/api/tasks/coworker`

  > 给待办事项添加合作者

  - body

  ```javascript
  {
    taskId: String,  // 要操作的待办事项id
    userId: String,
    coworkerId: String  // 合作者的userId
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
  {
    code: 400,
    data: {
      message: "the task doesn't belong to you"  // 操作的待办事项不属于userId对应的用户
    }
  }
  {
    code: 400,
    data: {
      message: "the task doesn't exist"  // 提供的taskId不存在
    }
  }
  {
    code: 400,
    data: {
      message: "the relation already exists"  // taskId和coworkerId的关系已存在
    }
  }
  ```

- `DETELE` `/api/tasks/coworker`

  > 删除待办事项的合作者

  - body

  ```javascript
  {
    taskId: String,  // 要操作的待办事项id
    userId: String,
    coworkerId: String  // 合作者的userId
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
  {
    code: 400,
    data: {
      message: "the task doesn't belong to you"  // 操作的待办事项不属于userId对应的用户
    }
  }
  {
    code: 400,
    data: {
      message: "delete failed"  // 各种原因导致了删除出错
    }
  }
  ```
