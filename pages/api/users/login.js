import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import generateToken from "../../../lib/generateToken"

export default async function handler(req, res) {
  const {method, body} = req;
  await dbConnect();

  switch (method) {
    case "POST":
      let user = await User.findOne({userId: body.userId});
      if (!user) {
          return res.status(400).json({ message: "the user doesn't exist"});
        }
      if (body.password !== user.password){
          return res.status(400).json({ message: "password error"});
      }
      let token = generateToken(user.userId, 24);  // 第二个参数是过期时间
      res.status(200).json({ 
        message: "success",
        entity: {token: token}
      });
      break;
    default:
      res.status(400).json({ message: "null"});
      break;
  }
}
