import { Controller, Post, Get, Query, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { LikeService } from './like.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';


@Controller('likes')
@UseGuards(AuthGuard('jwt'))
export class LikeController {
  constructor(private readonly likeService: LikeService) {}
// Toggle Like for Article or Comment
  @Post('toggle')
  async toggleLike(
    @Req() req: Request,
    @Query('articleId') articleId?: number,
    @Query('commentId') commentId?: number,
  ) {
    if (!articleId && !commentId) {
      throw new BadRequestException('articleId or commentId must be provided');
    }

    const user = req.user as any;
    return this.likeService.toggleLike(user, articleId, commentId);
  }

  // Get Article Likes
  @Get('article')
  async getArticleLikes(@Query('id') id: number) {
    return this.likeService.getArticleLikes(id);
  }

  // Get Comment Likes
  @Get('comment')
  async getCommentLikes(@Query('id') id: number) {
    return this.likeService.getCommentLikes(id);
  }
}
