import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import verifyToken from "../../../lib/verifyToken"
/**
 * @swagger
 * /api/users/[userId]:
 *   get:
 *     description: Returns a user
 *     responses:
 *       200:
 *         description: user
 *       400:
 *         description: error!
 */
export default async function handler(req, res) {
  const {
    query: { userId },
    body,
    method,
    cookies
  } = req;

  if(!cookies || !cookies.token || userId !== verifyToken(cookies.token)){
    return res.status(400).json({ message: "please sign in"});
  }

  await dbConnect();

  const user = await User.findOne({userId: userId});
  if (!user) {
    return res.status(400).json({ message: "user doesn't exist"});
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
      let newValue = {};
      if(body.slogan){
        newValue.slogan = body.slogan;
      }
      if(body.userName){
        newValue.userName = body.userName;
      }
      if(body.password && body.newPass){
        if (user.password !== body.password) {
          return res.status(400).json({ message: "password error"});
        }
        newValue.password = body.newPass;
      }
      await User.updateOne({userId: userId}, {$set: newValue});
      res.status(200).json({ message: "success"});
      break;
    default:
      res.status(400).json({ message: "null"});
      break;
  }
}
