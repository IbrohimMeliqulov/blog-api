import dotenv from "dotenv";
dotenv.config();
import AppDataSource from "./config/database.js";
import { app } from "./app.js";
console.log(process.env.DB_HOST);
const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error occured", err);
  }
};

startServer();
