import { IsEmail, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @MinLength(3)
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;
}
