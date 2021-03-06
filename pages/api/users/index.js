import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
/**
 * @swagger
 * /api/users:
 *   get:
 *     description: Returns users list
 *     responses:
 *       200:
 *         description: user[]
 *       400:
 *         description: error!
 */
export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const pet = await User.create(req.body);
        res.status(201).json({ success: true, data: pet });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
