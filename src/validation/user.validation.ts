import * as z from "zod";

const UserSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8).max(25),
});

const UserUpdateSchema = z.object({
  name: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).max(25).optional(),
});

export { UserSchema, UserUpdateSchema };
