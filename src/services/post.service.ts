import { Repository } from "typeorm";
import { Post } from "../entities/post.js";
import { BaseService } from "./base.service.js";
import { slugify } from "../utils/slugify.js";

export class PostService extends BaseService<Post> {
  protected searchableFields: (keyof Post)[] = ["content", "title"];
  constructor(postRepository: Repository<Post>) {
    super(postRepository);
  }

  async createPost(data: Partial<Post>): Promise<Post> {
    data.slug = slugify(data.slug as string);
    const post = this.repository.create(data);
    return await this.repository.save(post);
  }

  async updatePost(id: string, data: Partial<Post>): Promise<Post> {
    const post = await this.findOne(id);

    this.repository.merge(post, data);
    return await this.repository.save(post);
  }
}
