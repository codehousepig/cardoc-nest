import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSpecDto } from './dto/create-spec.dto';
import { UpdateSpecDto } from './dto/update-spec.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Spec } from './entities/spec.entity';
import { BaseInfo } from "../baseinfo/entities/baseinfo.entity";

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
    if (existSpec) throw new ForbiddenException();
    const spec = await this.specRepository.save(createSpecDto);

    const existTrim = await this.baseInfoRepository.findOne({ trimId: createSpecDto.id });
    if (existTrim) {
      existTrim.spec = spec;
      await this.baseInfoRepository.save(existTrim);
    }
    return spec.id;
  }

  findAll() {
    return `This action returns all spec`;
  }

  async findOne(id: number): Promise<Spec> {
    const result = await this.specRepository.findOne({ id: id });
    if (!result) throw new NotFoundException(`Spec ${id} not found.`);
    return result;
  }

  update(id: number, updateSpecDto: UpdateSpecDto) {
    return `This action updates a #${id} spec`;
  }

  remove(id: number) {
    return `This action removes a #${id} spec`;
  }
}
