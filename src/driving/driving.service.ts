import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateDrivingDto } from './dto/create-driving.dto';
import { UpdateDrivingDto } from './dto/update-driving.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Driving } from './entities/driving.entity';
import { Repository } from 'typeorm';
import { Spec } from '../spec/entities/spec.entity';

@Injectable()
export class DrivingService {
  constructor(
    @InjectRepository(Spec)
    private readonly specRepository: Repository<Spec>,
    @InjectRepository(Driving)
    private readonly drivingRepository: Repository<Driving>,
  ) {}
  async create(createDrivingDto: CreateDrivingDto) {
    const existD = await this.drivingRepository.findOne({
      id: createDrivingDto.id,
    });
    if (existD) throw new ForbiddenException();
    const driving = await this.drivingRepository.save(createDrivingDto);

    const existSpec = await this.specRepository.findOne({
      id: createDrivingDto.id,
    });
    if (existSpec) {
      existSpec.driving = driving;
      await this.specRepository.save(existSpec);
    }
    return driving.id;
  }

  findAll() {
    return `This action returns all driving`;
  }

  findOne(id: number) {
    return `This action returns a #${id} driving`;
  }

  update(id: number, updateDrivingDto: UpdateDrivingDto) {
    return `This action updates a #${id} driving`;
  }

  remove(id: number) {
    return `This action removes a #${id} driving`;
  }
}
