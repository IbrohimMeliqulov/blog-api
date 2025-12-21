import { Router } from "express";
import userRouter from "./user.routes.js";

export const router = Router();

router.use("/users", userRouter);
