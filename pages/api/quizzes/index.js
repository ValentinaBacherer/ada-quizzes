import dbConnect from "../../../utils/dbConnect";
import Quiz from "../../../models/Quiz";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const quizzes = await Quiz.find(
          {}
        ); /* find all the data in our database */

        res.status(200).json({
          data: quizzes,
          success: true,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }

      break;
    case "POST":
      try {
        const quiz = await Quiz.create(
          req.body
        ); /* create a new model in the database */

        res.status(201).json({
          data: quiz,
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
