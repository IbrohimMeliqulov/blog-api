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
    const author_idExists = await this.repository.findOne({
      where: { author_id: data.author_id },
    });

    const post_idExists = await this.repository.findOne({
      where: { post_id: data.post_id },
    });

    if (author_idExists) {
      throw ApiError.notFound(`Resource with ID ${author_idExists} not found`);
    }

    if (post_idExists) {
      throw ApiError.notFound(`Resource with ID ${post_idExists} not found`);
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
