import express, { type Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import AppDataSource from "./config/database.js";
import router from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.use((_, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandler);

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
