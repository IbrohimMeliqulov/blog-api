import { Repository } from "typeorm";
import { Comment } from "../entities/comment.js";
import { BaseService } from "./base.service.js";
import { ApiError } from "../middlewares/ApiError.js";

export class CommentService extends BaseService<Comment> {
  protected searchableFields: (keyof Comment)[] = ["content"];
  constructor(commentRepository: Repository<Comment>) {
    super(commentRepository);
  }

  async createComment(data: Partial<Comment>): Promise<Comment> {
    // const user = await this.repository.findOne({
    //   where: { id: data.author_id },
    // });

    // const post = await this.repository.findOne({
    //   where: { id: data.post_id },
    // });

    // if (!user) {
    //   throw ApiError.notFound(`User with ID ${user} not found`);
    // }

    // if (!post) {
    //   throw ApiError.notFound(`Post with ID ${post} not found`);
    // }
    const comment = this.repository.create(data);
    return await this.repository.save(comment);
  }

  async updateComment(id: string, data: Partial<Comment>): Promise<Comment> {
    const comment = await this.findOne(id);

    this.repository.merge(comment, data);
    return await this.repository.save(comment);
  }
}
