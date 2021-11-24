import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBaseInfoDto } from './dto/create-baseinfo.dto';
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
    if (existInfo)
      throw new BadRequestException(
        'Parameter가 잘못되었습니다. 이미 존재하는 정보입니다.',
      );
    const baseEn = await this.baseInfoRepository.save(createBaseInfoDto);
    return baseEn.trimId;
  }

  async findOne(id: number): Promise<BaseInfo> {
    const result = await this.baseInfoRepository.findOne({ trimId: id });
    if (!result)
      throw new BadRequestException(
        'Parameter가 잘못되었습니다. trim의 정보가 없습니다.',
      );
    return result;
  }
}
