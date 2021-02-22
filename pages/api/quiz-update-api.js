import { dbConnection } from "../../src/dbConnection";

const collectionName = "userQuiz";

export default async (req, res) => {
  console.log("API quiz-update-api", req.body);
  res.status(200).json({
    messagge: "Actualizacion exitosa",
  });

  if (req.method === false) {
    try {
      const db = await dbConnection();
      const collection = await db.collection(collectionName);
      // TODO que funcione
      const response = await collection.updateOne(
        {
          id: req.body.userquizId,
        },
        {
          $set: req.body.activeQuiz,
        }
      );

      res.status(200).json({
        messagge: "Actualizacion exitosa",
        response,
      });
    } catch (error) {
      res.status(500).json({
        error,
        messagge: "Actualizacion fallida",
      });
    }
  }
};
