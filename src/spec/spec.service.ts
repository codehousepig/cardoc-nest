import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSpecDto } from './dto/create-spec.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Spec } from './entities/spec.entity';
import { BaseInfo } from '../baseinfo/entities/baseinfo.entity';

@Injectable()
export class SpecService {
  constructor(
    @InjectRepository(BaseInfo)
    private readonly baseInfoRepository: Repository<BaseInfo>,
    @InjectRepository(Spec)
    private readonly specRepository: Repository<Spec>,
  ) {}
  async create(createSpecDto: CreateSpecDto) {
    const existSpec = await this.specRepository.findOne({
      id: createSpecDto.id,
    });
    if (existSpec)
      throw new BadRequestException(
        'Parameter가 잘못되었습니다. 이미 존재하는 정보입니다.',
      );
    const spec = await this.specRepository.save(createSpecDto);

    const existTrim = await this.baseInfoRepository.findOne({
      trimId: createSpecDto.id,
    });
    if (existTrim) {
      existTrim.spec = spec;
      await this.baseInfoRepository.save(existTrim);
    }
    return spec.id;
  }
}
