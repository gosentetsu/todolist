import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import Relation from "../../../models/Relation";
import verifyToken from "../../../lib/verifyToken"
import checkAttr from "../../../lib/checkAttributes"

export default async function handler(req, res) {
  const {
    query: { userId },
    body,
    method,
    cookies
  } = req;

  let check_result, result;

  if(!cookies || !cookies.token || userId !== verifyToken(cookies.token)){
    return res.status(200).json({ message: "please sign in"});
  }

  await dbConnect();

  const user = await User.findOne({userId: userId});
  if (!user) {
    return res.status(200).json({ message: "user doesn't exist"});
  }

  switch (method) {
    case "GET":
      res.status(200).json({ 
        message: "success",
        entity: {
          userId: user.userId,
          userName: user.userName,
          slogan: user.slogan,
          picUrl: user.picUrl
        }
      });
      break;
    case "PUT":
      check_result = checkAttr(body, ["slogan", "userName", "password", "newPass"], false);
      if(!check_result){
        return res.status(200).json({ message: "wrong attributes"});
      }

      let newValue = {};
      if(body.slogan){
        newValue.slogan = body.slogan;
      }
      if(body.userName){
        // 用户名查重
        result = await User.findOne({userName: body.userName});
        if(result){
          return res.status(200).json({ message: "the user name already exists"});
        }
        newValue.userName = body.userName;
      }
      if(body.password && body.newPass){
        if (user.password !== body.password) {
          return res.status(200).json({ message: "password error"});
        }
        newValue.password = body.newPass;
      }
      else if(body.password && !body.newPass){
        return res.status(200).json({ message: "the newPass is required"});
      }
      await User.updateOne({userId: userId}, {$set: newValue});
      res.status(200).json({ message: "success"});
      break;
    case "DELETE":
      result = await User.deleteOne({userId: userId});
      if(result.deletedCount === 0){
        return res.status(200).json({ message: "delete failed"});
      }
      await Relation.deleteMany({userId: userId});
      res.status(200).json({ message: "success"});
      break;
    default:
      res.status(400).json({ message: "null"});
      break;
  }
}
