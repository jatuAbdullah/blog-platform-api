import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Article } from '../article/article.entity';
import { Comment } from '../comment/comment.entity'; // import comment entity

@Entity()
@Unique(['user', 'article']) // only applies to article, but...
@Unique(['user', 'comment']) // also prevent duplicate comment likes
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.likes)
  user: User;

  @ManyToOne(() => Article, { nullable: true })
  article?: Article;

  @ManyToOne(() => Comment, { nullable: true })
  comment?: Comment;

  @CreateDateColumn()
  createdAt: Date;
}
