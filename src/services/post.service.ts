import { Repository } from "typeorm";
import { Post } from "../entities/post.js";
import { BaseService } from "./base.service.js";
import type { User } from "../entities/user.js";
import { ApiError } from "../middlewares/ApiError.js";

export class PostService extends BaseService<Post> {
  protected searchableFields: (keyof Post)[] = ["content", "title"];
  constructor(
    postRepository: Repository<Post>,
    private userRespository: Repository<User>,
  ) {
    super(postRepository);
  }

  async createPost(data: Partial<Post>): Promise<Post> {
    const user = await this.userRespository.findOne({
      where: { id: data.author_id },
    });

    if (!user) {
      throw ApiError.notFound(`User with ID ${user} not found`);
    }
    const post = this.repository.create(data);
    return await this.repository.save(post);
  }

  async updatePost(id: string, data: Partial<Post>): Promise<Post> {
    const post = await this.findOne(id);

    this.repository.merge(post, data);
    return await this.repository.save(post);
  }
}
