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
  adminId: String  // task的创建者id，拥有对合作任务以及合作关系的处置权
  content: String,
  importance: Number,  //标注待办事项的重要性，范围1-5，数值越大越重要
  tag: String,  //标签，按标签给待办事项分类
  status: Boolean,  //状态，待办事项是否完成
  beginTime: Number,
  endTime: Number
}
```

## Relation

> user 和 task 的关系表，n:m 关系

```javascript
{
  userId: String,
  taskId: String,
  acknowledge: Boolean  // 新的合作任务是否被接受，未接受时可以删除该合作关系
}
```

# 接口设计

- 返回的 message 为 null 时，均是因为请求方法错误，以下不重复指出

- 返回的 message 为 wrong attributes 时，是因为传入的body中的参数和接口文档中定义的不匹配，以下不重复指出

- 返回的 message 为 please sign in 时，是因为未提供 token 或 token 过期（有效期设定为 24 小时），以下不重复指出

- 返回的 message 为 you don't have permission 时，是因为用户更新、删除了不是该用户创建的task以及relation，以下不重复指出

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
    code: 200,
    data: {
      message: "the user doesn't exist"  // 提供的userId有问题
    }
  }
  {
    code: 200,
    data: {
      message: "password error"  // 提供的password有问题
    }
  }
  ```

- `GET` `/api/users/logout`

  > 取消登录

  - response

  ```javascript
  {
    code: 200,
    data: {
      message: "success"
    }
  }
  ```

- `POST` `/api/users/upload`
  > 在form标签上加上固定写法的属性为enctype="multipart/form-data"，否则文件或图片会上传失败

  - response

  ```javascript
  {
    code: 200,
    data: {
      message: "success",
      entity: {
        picUrl: String
      }
    }
  }
  {
    code: 200,
    data: {
      message: "fail to upload"  // 因为各种异常导致未上传成功
  }

- `GET` `/api/users/name/[userName]`

  > 根据 userName 查找 userId

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
    code: 200,
    data: {
      message: "the user doesn't exist"  // 提供的userName有问题
    }
  }
  ```

- `GET` `/api/users/[userId]`

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
    code: 200,
    data: {
      message: "the user doesn't exist"  // 提供的userId有问题
    }
  }
  ```

- `PUT` `/api/users/[userId]`

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
    code: 200,
    data: {
      message: "the user doesn't exist"  // 提供的userId有问题
    }
  }
  {
    code: 200,
    data: {
      message: "password error"  // 旧密码输入错误
    }
  }
  ```

- `DELETE` `/api/users/[userId]`

  > 删除 userId 对应的用户

  - response

  ```javascript
  {
    code: 200,
    data: {
      message: "success",
    }
  }
  {
    code: 200,
    data: {
      message: "delete failed"  // User表中查不到userId
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
    code: 200,
    data: {
      message: "the user name already exists"  // userName已经注册过
    }
  }
  ```

- `GET` `/api/tasks/update`

  > 检查是否有新的合作任务

  - response

  ```javascript
  {
    code: 200,
    data: {
      message: "success",
      list: [
        {
          taskId: String,
          adminId: String,
          content: String,
          importance: Number,
          tag: String,
          status: Boolean,
          beginTime: Number,
          endTime: Number,
        },
        …
      ]
    }
  }
  {
    code: 200,
    data: {
      message: "no update"  // 没有新的合作任务
    }
  }
  ```

- `POST` `/api/tasks/update`

  > 是否接受该更新，接受则修改relation中的acknowledge为true，成功加入合作任务；拒绝则删除relation

  - body

  ```javascript
  {
    taskId: String,
    acknowledge: Boolean
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
    code: 200,
    data: {
      message: "error"  //更新acknowledge出错或者删除relation出错
    }
  }
  ```

- `GET` `/api/tasks/[userId]`

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
          adminId: String,
          content: String,
          importance: Number,
          tag: String,
          status: Boolean,
          beginTime: Number,
          endTime: Number,
          coworkers: [  // 该任务所属成员的信息，无合作者时数组长度为1
            {
              userId: String,
              acknowledge: Boolean,
              userName: String
            },
            …
          ]
        },
        …
      ]
    }
  }
  ```

- `POST` `/api/tasks/[userId]`

  > 往数据库中添加待办事项

  - body

  ```javascript
  {
    content: String,
    importance: Number,
    tag: String,
    beginTime: Number,
    endTime: Number
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

- `DELETE` `/api/tasks/[userId]`

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
    code: 200,
    data: {
      message: "delete failed"  // 各种原因导致了删除出错
    }
  }
  ```

- `PUT` `/api/tasks/[userId]`

  > 修改 task 的各个值，所有属性均为可选值，在需要更新时添加

  - body

  ```javascript
  {
    taskId: String,
    content: String,
    importance: Number,
    tag: String,
    status: Boolean,
    beginTime: Number,
    endTime: Number
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
    code: 200,
    data: {
      message: "taskId is required"  // 未提供taskId
    }
  }
  {
    code: 200,
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
    coworkerUserName: String  // 合作者的userName
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
    code: 200,
    data: {
      message: "the user doesn't exist"  // 提供的UserName不存在
    }
  }
  {
    code: 200,
    data: {
      message: "the user is already in your task"  // task合作者中已有该用户
    }
  }
  ```

- `DETELE` `/api/tasks/coworker`

  > 删除待办事项的合作者

  - body

  ```javascript
  {
    taskId: String,  // 要操作的待办事项id
    coworkerUserName: String  // 合作者的UserName
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
    code: 200,
    data: {
      message: "delete failed"  // 各种原因导致了删除出错
    }
  }
  {
    code: 200,
    data: {
      message: "the user isn't in your task"  // task合作者中无该用户
    }
  }
  ```
