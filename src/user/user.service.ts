import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private connection: Connection,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      id: createUserDto.id,
    });
    if (existUser) throw new ForbiddenException();
    const hash = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userRepository.create({
      ...createUserDto,
      password: hash,
    });
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

  // 사용자에게 자동차 정보를 저장한다
  async update(updateUserDTOs: UpdateUserDto[]) {
    if (updateUserDTOs.length > 5) return '5명 이하만 입력이 가능합니다.';
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (let i = 0; i < updateUserDTOs.length; i++) {
        const user = await this.findByName(updateUserDTOs[i].id);
        console.log(user);
        user.password = updateUserDTOs[i].password;
        user.trimId = updateUserDTOs[i].trimId;
        const updateUser = await this.userRepository.save(user);
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    return `Updates a success ${updateUserDTOs.length}s ID`;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return `delete a id: ${id}`;
  }
}
