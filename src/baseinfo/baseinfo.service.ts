import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBaseInfoDto } from './dto/create-baseinfo.dto';
import { UpdateBaseInfoDto } from './dto/update-baseinfo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseInfo } from './entities/baseinfo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BaseInfoService {
  constructor(
    @InjectRepository(BaseInfo)
    private readonly baseInfoRepository: Repository<BaseInfo>,
  ) {}
  async create(createBaseInfoDto: CreateBaseInfoDto): Promise<number> {
    const existInfo = await this.baseInfoRepository.findOne({
      trimId: createBaseInfoDto.trimId,
    });
    if (existInfo) throw new ForbiddenException();
    const baseEn = await this.baseInfoRepository.save(createBaseInfoDto);
    return baseEn.trimId;
  }

  async findAll() {
    return await this.baseInfoRepository.find();
  }

  async findOne(id: number): Promise<BaseInfo> {
    const result = await this.baseInfoRepository.findOne(
      { trimId: id },
      // { relations: ['spec', 'spec.driving'] },
    );
    if (!result) throw new NotFoundException(`TrimInfo ${id} not found.`);
    return result;
  }

  update(id: number, updateBaseInfoDto: UpdateBaseInfoDto) {
    return `This action updates a #${id} baseinfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} baseinfo`;
  }
}
