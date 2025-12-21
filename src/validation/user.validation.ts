import * as z from "zod";

const UserSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8).max(25),
});

const UserUpdateSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8).max(25),
});

export { UserSchema, UserUpdateSchema };
