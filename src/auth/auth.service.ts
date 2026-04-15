/* eslint-disable prettier/prettier */
// auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    const payload = {
      sub: user.user_id,
      email: user.email,
      role: user.role.role_code
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

async register(dto: RegisterDto) {
  const existing = await this.usersService.findByEmail(dto.email);

  if (existing) {
    throw new ConflictException('User already exists');
  }


  const user = await this.usersService.create(dto);

  return {
    message: 'User registered successfully',
    user,
  };
}
}