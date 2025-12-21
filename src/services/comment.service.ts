import { Repository } from "typeorm";
import { Comment } from "../entities/comment.js";
import { BaseService } from "./base.service.js";
import { ApiError } from "../middlewares/ApiError.js";
import type { User } from "../entities/user.js";
import type { Post } from "../entities/post.js";

export class CommentService extends BaseService<Comment> {
  protected searchableFields: (keyof Comment)[] = ["content"];
  constructor(
    commentRepository: Repository<Comment>,
    private userRepository: Repository<User>,
    private postRepository: Repository<Post>,
  ) {
    super(commentRepository);
  }

  async createComment(data: Partial<Comment>): Promise<Comment> {
    const user = await this.userRepository.findOne({
      where: { id: data.author_id },
    });
    const post = await this.postRepository.findOne({
      where: { id: data.post_id },
    });

    if (!user) {
      throw ApiError.notFound(`User with ID ${user} not found`);
    }

    if (!post) {
      throw ApiError.notFound(`Post with ID ${post} not found`);
    }
    const comment = this.repository.create(data);
    return await this.repository.save(comment);
  }

  async updateComment(id: string, data: Partial<Comment>): Promise<Comment> {
    const comment = await this.findOne(id);

    this.repository.merge(comment, data);
    return await this.repository.save(comment);
  }
}
