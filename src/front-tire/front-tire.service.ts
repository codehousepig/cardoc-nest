import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFrontTireDto } from './dto/create-front-tire.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FrontTire } from './entities/front-tire.entity';
import { Repository } from 'typeorm';
import { Driving } from '../driving/entities/driving.entity';

@Injectable()
export class FrontTireService {
  constructor(
    @InjectRepository(Driving)
    private readonly drivingRepository: Repository<Driving>,
    @InjectRepository(FrontTire)
    private readonly frontTireRepository: Repository<FrontTire>,
  ) {}
  async create(createFrontTireDto: CreateFrontTireDto) {
    const existTire = await this.frontTireRepository.findOne({
      id: createFrontTireDto.id,
    });
    if (existTire) throw new BadRequestException('Parameter가 잘못되었습니다.');
    const front = await this.frontTireRepository.save(createFrontTireDto);

    const existDri = await this.drivingRepository.findOne({
      id: createFrontTireDto.id,
    });
    if (existDri) {
      existDri.frontTire = front;
      await this.drivingRepository.save(existDri);
    }
    return front.id;
  }

  async findOne(id: number) {
    const fTire = await this.frontTireRepository.findOne({ id: id });
    if (!fTire) throw new BadRequestException(`Parameter가 잘못되었습니다. 타이어 전의 정보가 없습니다.`);
    return fTire;
  }
}
