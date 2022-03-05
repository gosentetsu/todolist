import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export default async function handler(req, res) {
  let result, userId;
  let idLength = 6;

  await dbConnect();

  switch (req.method) {
    case "POST":
      // 用户名查重
      result = await User.findOne({userName: req.body.userName});
      if(result){
        return res.status(400).json({ message: "the user name already exists"});
      }

      let idChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      while(true){
        userId = "U_";
        for(let i = 0; i < idLength; i++){
          let ind = Math.floor(Math.random()*62);
          userId += idChar[ind];
        }
        // userId查重
        result = await User.findOne({userId: userId});
        if(!result) break;
      }
      
      let user = {
        userId: userId,
        userName: req.body.userName,
        password: req.body.password,
        slogan: "",
        picUrl: ""
      };
      await User.create(user);
      res.status(200).json({ 
        message: "success",
        entity: {userId: userId}
      });
      break;
    default:
      res.status(400).json({ message: "null"});
      break;
  }
}
