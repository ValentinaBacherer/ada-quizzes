import { dbConnection } from "../../src/dbConnection";

const collectionName = "testQuiz";

export default async (req, res) => {
  console.log("API quizQuestions", req.body);

  try {
    const db = await dbConnection();
    const collection = await db.collection(collectionName);
    const cursor = await collection.find({ id: req.body.id });
    const quiz = await cursor.toArray();

    res.status(200).json({
      messagge: "Conexion exitosa",
      quiz,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
