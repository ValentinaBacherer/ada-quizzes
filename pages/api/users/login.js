import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";

export default async (req, res) => {
  try {
    const user = await User.findOne({
      name: req.body.user,
    });

    if (user.password === req.body.password) {
      user.createdAt = user.createdAt
        ? user.createdAt.toISOString().split("T")[0]
        : "";
      user.updatedAt = user.updatedtedAt
        ? user.updatedtedAt.toISOString()
        : "".split("T")[0];
      user._id = user._id.toString();
      res.status(200).json({
        access: true,
        message: "User found",
        user,
      });
    } else {
      res.status(200).json({
        access: false,
        message: "Wrong password",
        user,
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
