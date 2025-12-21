import {
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Entity,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";
import { slugify } from "../utils/slugify.js";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @ManyToOne("User", "posts", { onDelete: "CASCADE" })
  @JoinColumn({ name: "author_id" })
  author_id!: any;

  @Column("text")
  content!: string;

  @Column({ unique: true })
  slug!: string;

  @BeforeInsert()
  generateSlug() {
    this.slug = slugify(this.title);
  }

  @CreateDateColumn({ name: "created_at" })
  created_at!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at!: Date;
}
