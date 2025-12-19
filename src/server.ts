import express from "express";
import dotenv from "dotenv"
dotenv.config()

console.log(process.env.DB_HOST)
const app = express();
const PORT = process.env.PORT;




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
