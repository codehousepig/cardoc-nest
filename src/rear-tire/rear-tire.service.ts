import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRearTireDto } from './dto/create-rear-tire.dto';
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
    if (existTire) throw new BadRequestException('Parameter가 잘못되었습니다.');
    const rear = await this.rearTireRepository.save(createRearTireDto);

    const existDri = await this.drivingRepository.findOne({
      id: createRearTireDto.id,
    });
    if (existDri) {
      existDri.rearTire = rear;
      await this.drivingRepository.save(existDri);
    }
    return rear.id;
  }

  async findOne(id: number) {
    const rTire = await this.rearTireRepository.findOne({ id: id });
    if (!rTire) throw new BadRequestException(`Parameter가 잘못되었습니다. 타이어 후의 정보가 없습니다.`);
    return rTire;
  }
}
