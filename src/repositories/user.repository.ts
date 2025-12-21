import { AppDataSource } from "../config/database.js";
import { User } from "../entities/user.js";
import { UserService } from "../services/user.service.js";

export const userRepository = new UserService(
  AppDataSource.getRepository(User),
);
