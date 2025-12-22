import express, { urlencoded } from "express";
import type { Request, Response, NextFunction } from "express";
import  router  from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.use((_, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
app.use(errorHandler);

export default app;
