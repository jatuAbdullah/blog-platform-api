import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { Article } from '../article/article.entity';
import { User } from '../user/user.entity';
import { Comment } from '../comment/comment.entity';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like, Article, Comment, User]),
  ],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
