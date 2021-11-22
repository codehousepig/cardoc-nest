import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    const userEn = await this.userRepository.save(user);
    return userEn.userId;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ userId: id });
    if (!user) throw new NotFoundException(`User with userID ${id} not found.`);
    return user;
  }

  async findByName(id: string) {
    const user = await this.userRepository.findOne({ id: id });
    if (!user) throw new NotFoundException(`User with ID ${id} not found.`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    user.password = updateUserDto.password;
    const updateUser = await this.userRepository.save(user);
    return `updates a password for ${updateUser.id}`;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return `delete a id: ${id}`;
  }
}
