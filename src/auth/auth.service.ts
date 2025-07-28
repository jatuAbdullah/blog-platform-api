import { Injectable, ConflictException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';


@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    // Delegate to users service
    return this.UserService.create(createUserDto);
  }

  async validateUser(email: string, password: string): Promise<any> {
  const user = await this.UserService.findByEmail(email);
  if (user && await bcrypt.compare(password, user.password)) {
    // Exclude password from returned user data
    const { password, ...result } = user;
    return result;
  }
  return null;
}

async login(user: any) {
  const payload = { username: user.username, sub: user.id };
  const token = this.jwtService.sign(payload);
  return {
    access_token: token,
  };
}
}
