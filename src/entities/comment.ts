import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "comments" })
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("text")
  content!: string;

  @ManyToOne("User", "comments", { onDelete: "CASCADE" })
  @JoinColumn({ name: "author_id" })
  author_id!: string;

  @ManyToOne("Post", "comments", { onDelete: "CASCADE" })
  @JoinColumn({ name: "post_id" })
  post_id!: string;

  @CreateDateColumn({ name: "created_at" })
  created_at!: Date;
}
