import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { validateFunction } from "../middlewares/validate.middleware.js";
import { UserSchema, UserUpdateSchema } from "../validation/user.validation.js";

const userRouter = Router();
userRouter.get("/", userController.findAll);
userRouter.get("/search", userController.search.bind(userController));
userRouter.get("/:id", userController.findOne);
userRouter.get("/find-by-email", userController.findByEmail);
userRouter.post("/", validateFunction(UserSchema), userController.create);
userRouter.put(
  "/:id",
  validateFunction(UserUpdateSchema),
  userController.update,
);
userRouter.delete("/:id", userController.delete);

export default userRouter;
