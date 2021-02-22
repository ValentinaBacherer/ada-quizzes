import { dbConnection } from "../../src/dbConnection"; // devuelve DB
// Insert one quiz
const collectionName = "users";

export default async (req, res) => {
  console.log("API Login", req.body);

  try {
    const db = await dbConnection();
    const collection = db.collection(collectionName);
    const cursor = await collection.find({
      name: req.body.user,
      password: req.body.password,
    });
    const users = await cursor.toArray();

    if (users.length) {
      res.status(200).json({
        access: true,
        message: "User found",
        users,
      });
    } else {
      res.status(200).json({
        access: false,
        message: "User not found",
        users,
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
