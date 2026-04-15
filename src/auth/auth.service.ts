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
      role: user.role_id // IMPORTANT: Ensure role_id is properly loaded as an object with role_id property
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


 const user = await this.usersService.create({
    ...dto,
    role_id: 6, // PUBLIC USER (or lowest role)
  });

  return {
    message: 'User registered successfully',
    user,
  };
}

async createAdminIfNotExists() {
  const existingAdmin = await this.usersService.findByEmail('admin@system.com');

  if (existingAdmin) {
    console.log('Admin already exists');
    return;
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);

  await this.usersService.create({
    username: 'admin',
    email: 'admin@system.com',
    password: hashedPassword,
    full_name: 'System Admin',
    role_id: 1, //  ADMIN
  });

  console.log('Admin user created');
}
}