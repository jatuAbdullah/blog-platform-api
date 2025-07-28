import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Body,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto';
import { UserRole } from '../user-role.enum';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateCommentDto, @Req() req) {
    return this.commentService.create(dto, req.user as JwtPayloadDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.commentService.remove(id, req.user as JwtPayloadDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN)
  @Get(':id')
  findArticleComments(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.commentService.findByArticleId(id, req.user as JwtPayloadDto);
  }
}
