import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";
import verifyToken from "../../../../lib/verifyToken"

export default async function handler(req, res) {
  const {
    query: { userName },
    method,
    cookies
  } = req;

  if(!cookies || !cookies.token || cookies.userId !== verifyToken(cookies.token)){
    return res.status(200).json({ message: "please sign in"});
  }

  await dbConnect();

  switch (method) {
    case "GET":
        let user = await User.findOne({userName: userName});
        if(!user){
          return res.status(200).json({ message: "the user doesn't exist"});
        }
        res.status(200).json({ 
            message: "success",
            entity: {userId: user.userId}
        });
      break;
    default:
      res.status(400).json({ message: "null"});
      break;
  }
}
