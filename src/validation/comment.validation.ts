import * as z from "zod";

const CommentSchema = z.object({
  content: z.string(),
  author_id: z.string().uuid(),
  post_id: z.string(),
});

const CommentUpdateSchema = z.object({
  content: z.string().optional(),
  author_id: z.string().uuid().optional(),
  post_id: z.string().optional(),
});

export { CommentSchema, CommentUpdateSchema };
