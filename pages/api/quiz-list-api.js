import { dbConnection } from "../../src/dbConnection";

const collectionName = "userQuiz";

export default async (req, res) => {
  console.log("API quizz-list-api", req.body);
  // TODO buscar en userquiz con idUser y si no encuentra crearlos de testQuiz

  try {
    const db = await dbConnection();
    const collection = await db.collection(collectionName);
    const cursor = await collection.find({});
    const quizzes = await cursor.toArray();

    res.status(200).json({
      messagge: "Conexion exitosa",
      quizzes,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
