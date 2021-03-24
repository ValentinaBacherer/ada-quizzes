/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable consistent-return */
import dbConnect from "../../../utils/dbConnect";
import Quiz from "../../../models/Quiz";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
        const quiz = await Quiz.findById(id);

        if (!quiz) {
          return res.status(400).json({ success: false });
        }

        quiz.createdAt = quiz.createdAt
          ? quiz.createdAt.toISOString().split("T")[0]
          : "";
        quiz.updatedAt = quiz.updatedtedAt
          ? quiz.updatedtedAt.toISOString()
          : "".split("T")[0];

        res.status(200).json({
          data: quiz,
          success: true,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }

      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        const quiz = await Quiz.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!quiz) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({
          data: quiz,
          success: true,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }

      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const deletedQuiz = await Quiz.deleteOne({ _id: id });

        if (!deletedQuiz) {
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
