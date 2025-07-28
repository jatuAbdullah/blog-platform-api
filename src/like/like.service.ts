import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { Article } from '../article/article.entity';
import { User } from '../user/user.entity';
import { JwtPayload } from 'jsonwebtoken';
 import { Comment } from '../comment/comment.entity'; 


@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepo: Repository<Like>,

    @InjectRepository(Article)
    private articleRepo: Repository<Article>,

    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}


async toggleLike(
  user: JwtPayload,
  articleId?: number,
  commentId?: number
) {
  if (!articleId && !commentId)
    throw new BadRequestException('Article ID or Comment ID is required');

  if (articleId && commentId)
    throw new BadRequestException('Cannot like both Article and Comment at the same time');

  const userEntity = await this.userRepo.findOne({ where: { id: user.userId } });
  if (!userEntity) throw new NotFoundException('User not found');

  let existingLike, targetEntity;

  if (articleId) {
    targetEntity = await this.articleRepo.findOne({ where: { id: articleId } });
    if (!targetEntity) throw new NotFoundException('Article not found');

    existingLike = await this.likeRepo.findOne({
      where: { article: { id: articleId }, user: { id: user.userId } },
    });
  } else if (commentId) {
    targetEntity = await this.commentRepo.findOne({ where: { id: commentId } });
    if (!targetEntity) throw new NotFoundException('Comment not found');

    existingLike = await this.likeRepo.findOne({
      where: { comment: { id: commentId }, user: { id: user.userId } },
    });
  }

  if (existingLike) {
    await this.likeRepo.remove(existingLike);
    return { message: articleId ? 'Article unliked' : 'Comment unliked' };
  } else {
    const like = this.likeRepo.create({
      user: userEntity,
      article: articleId ? targetEntity : undefined,
      comment: commentId ? targetEntity : undefined,
    });

    await this.likeRepo.save(like);
    return { message: articleId ? 'Article liked' : 'Comment liked' };
  }
}



  async getArticleLikes(articleId: number) {
  const article = await this.articleRepo.findOne({ where: { id: articleId } });
  if (!article) throw new NotFoundException('Article not found');

  const likes = await this.likeRepo.find({
    where: { article: { id: articleId } },
    relations: ['user'],
  });

  return {
    count: likes.length,
    users: likes.map((like) => like.user.username),
  };
}


async getCommentLikes(commentId: number) {
  const comment = await this.commentRepo.findOne({ where: { id: commentId } });
  if (!comment) throw new NotFoundException('Comment not found');

  const likes = await this.likeRepo.find({
    where: { comment: { id: commentId } },
    relations: ['user'],
  });

  return {
    count: likes.length,
    users: likes.map((like) => like.user.username),
  };
}

}
