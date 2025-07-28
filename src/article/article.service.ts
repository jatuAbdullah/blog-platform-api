import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto';

import { User } from '../user/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

async create(dto: CreateArticleDto, user: JwtPayloadDto) {
  console.log('✅ [ArticleService] user:', user);

  const article = this.articleRepository.create({
    ...dto,
    authorId: user.userId, // ✅ simple number
  });

  return this.articleRepository.save(article);
}

  async findAll(): Promise<Article[]> {
    return this.articleRepository.find({ relations: ['author'] });
  }

  async findOne(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({ where: { id }, relations: ['author'] });
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }

  async update(id: number, updateDto: UpdateArticleDto, user: JwtPayloadDto): Promise<Article> {
    const article = await this.findOne(id);
    console.log(article.author.id , user.userId);
    if (article.author.id !== user.userId) throw new ForbiddenException('Not your article');
    Object.assign(article, updateDto);
    return this.articleRepository.save(article);
  }

  async remove(id: number, user: JwtPayloadDto): Promise<{ message: string }> {
    const article = await this.findOne(id);
    if (article.author.id !== user.userId) throw new ForbiddenException('Not your article');
    await this.articleRepository.remove(article);

      return { message: `Article with ID ${id} has been deleted.` };
  }
}
