import * as z from "zod";

const PostSchema = z.object({
  title: z.string(),
  author_id: z.string(),
  content: z.string().min(15).max(50),
});

const PostUpdateSchema = z.object({
  title: z.string().optional(),
  author_id: z.string().optional(),
  content: z.string().min(15).max(50).optional(),
});

export { PostSchema, PostUpdateSchema };
