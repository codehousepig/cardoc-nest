import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateFrontTireDto } from './dto/create-front-tire.dto';
import { UpdateFrontTireDto } from './dto/update-front-tire.dto';
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
    if (existTire) throw new ForbiddenException();
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

  findAll() {
    return `This action returns all frontTire`;
  }

  async findOne(id: number) {
    const fTire = await this.frontTireRepository.findOne({ id: id });
    if (!fTire) throw new NotFoundException(`FrontTire ${id} not found.`);
    return fTire;
  }

  update(id: number, updateFrontTireDto: UpdateFrontTireDto) {
    return `This action updates a #${id} frontTire`;
  }

  remove(id: number) {
    return `This action removes a #${id} frontTire`;
  }
}
