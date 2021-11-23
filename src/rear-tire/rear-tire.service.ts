import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateRearTireDto } from './dto/create-rear-tire.dto';
import { UpdateRearTireDto } from './dto/update-rear-tire.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Driving } from '../driving/entities/driving.entity';
import { Repository } from 'typeorm';
import { RearTire } from './entities/rear-tire.entity';

@Injectable()
export class RearTireService {
  constructor(
    @InjectRepository(Driving)
    private readonly drivingRepository: Repository<Driving>,
    @InjectRepository(RearTire)
    private readonly rearTireRepository: Repository<RearTire>,
  ) {}
  async create(createRearTireDto: CreateRearTireDto) {
    const existTire = await this.rearTireRepository.findOne({
      id: createRearTireDto.id,
    });
    if (existTire) throw new ForbiddenException();
    const front = await this.rearTireRepository.save(createRearTireDto);

    const existDri = await this.drivingRepository.findOne({
      id: createRearTireDto.id,
    });
    if (existDri) {
      existDri.frontTire = front;
      await this.drivingRepository.save(existDri);
    }
    return front.id;
  }

  findAll() {
    return `This action returns all rearTire`;
  }

  async findOne(id: number) {
    const fTire = await this.rearTireRepository.findOne({ id: id });
    if (!fTire) throw new NotFoundException(`FrontTire ${id} not found.`);
    return fTire;
  }

  update(id: number, updateRearTireDto: UpdateRearTireDto) {
    return `This action updates a #${id} rearTire`;
  }

  remove(id: number) {
    return `This action removes a #${id} rearTire`;
  }
}
