/* eslint-disable prettier/prettier */
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const existing = await this.userRepository.findOne({
      where: [{ email: dto.email }, { username: dto.username }],
    });

    if (existing) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepository.create({
      ...dto,
      password_hash: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    return this.userRepository.findOne({ where: { user_id: id } });
  }

  async findByEmail(email: string) {
  return this.userRepository.findOne({
    where: { email },
    relations: ['role'], // IMPORTANT
  });
}

  async remove(id: string) {
    return this.userRepository.delete(id);
  }

  async updateRole(userId: string, role_id: number) {
  const user = await this.userRepository.findOne({
    where: { user_id: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  user.role_id = role_id;

  return this.userRepository.save(user);
}
}