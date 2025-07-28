import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateArticleDto {
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  body?: string;
}
