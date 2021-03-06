/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable consistent-return */
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
        const user = await User.findById(id);

        if (!user) {
          return res.status(400).json({ success: false });
        }

        user.createdAt = user.createdAt
          ? user.createdAt.toISOString().split("T")[0]
          : "";
        user.updatedAt = user.updatedtedAt
          ? user.updatedtedAt.toISOString()
          : "".split("T")[0];

        res.status(200).json({
          data: user,
          success: true,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }

      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        const user = await User.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!user) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({
          data: user,
          success: true,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }

      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const deletedUser = await User.deleteOne({ _id: id });

        if (!deletedUser) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({
          data: {},
          success: true,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }

      break;

    default:
      res.status(400).json({ success: false });

      break;
  }
}
