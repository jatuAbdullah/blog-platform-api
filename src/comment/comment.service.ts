import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto';
import { Article } from '../article/article.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(Article)
    private readonly articleRepo: Repository<Article>,
  ) {}

  async create(dto: CreateCommentDto, user: JwtPayloadDto) {
    const article = await this.articleRepo.findOneBy({ id: dto.articleId });
    if (!article) throw new NotFoundException('Article not found');

    const comment = this.commentRepo.create({
      body: dto.body,
      articleId: dto.articleId,
      authorId: user.userId,
    });

    return this.commentRepo.save(comment);
  }

  async remove(id: number, user: JwtPayloadDto) {
    const comment = await this.commentRepo.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.authorId !== user.userId)
      throw new ForbiddenException('Not your comment');

    await this.commentRepo.remove(comment);
    return { message: 'Comment deleted successfully' };

    
  }


    async findByArticleId(id: number, user: JwtPayloadDto) {
  const comments = await this.commentRepo.find({
    where: { article: { id } },
    
  });

  if (comments.length === 0) {
    return { message: `No comments found for Article ${id}` };
  }

  return comments;
}

}
