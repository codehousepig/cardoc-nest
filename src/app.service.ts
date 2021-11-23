import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Repository } from 'typeorm';
import { BaseInfo } from './baseinfo/entities/baseinfo.entity';
import { Spec } from './spec/entities/spec.entity';
import { Driving } from './driving/entities/driving.entity';
import { FrontTire } from './front-tire/entities/front-tire.entity';
import { RearTire } from './rear-tire/entities/rear-tire.entity';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(BaseInfo)
    private readonly baseInfoRepository: Repository<BaseInfo>,
    @InjectRepository(Spec)
    private readonly specRepository: Repository<Spec>,
    @InjectRepository(Driving)
    private readonly drivingRepository: Repository<Driving>,
    @InjectRepository(FrontTire)
    private readonly frontTireRepository: Repository<FrontTire>,
    @InjectRepository(RearTire)
    private readonly rearTireRepository: Repository<RearTire>,
  ) {}

  // DB 기본 정보 넣기 (초기화)
  async onApplicationBootstrap(): Promise<any> {
    // Swagger default 값 제외하고 저장: USER
    const users = {
      user1: { id: 'mylovewolkswagen', password: '$2b$10$DODkPKtnC8dR4hBRSdUQA.x0oyLo.kNB0aKVKQAbJlsLwEVZSGZj6' },
      user2: { id: 'bmwwow', password: '$2b$10$DODkPKtnC8dR4hBRSdUQA.x0oyLo.kNB0aKVKQAbJlsLwEVZSGZj6' },
      user3: { id: 'dreamcar', password: '$2b$10$DODkPKtnC8dR4hBRSdUQA.x0oyLo.kNB0aKVKQAbJlsLwEVZSGZj6' },
    };
    for (const index in users) await this.userRepository.save(users[index]);

    // Swagger default 값 제외하고 저장: rearTIRE
    const rearTires = {
      4999: { id: 4999, name: '타이어 후', width: 255, ratio: 60, wheel: 16 },
      5000: { id: 5000, name: '타이어 후', width: 255, ratio: 60, wheel: 16 },
      5001: { id: 5001, name: '타이어 후', width: 255, ratio: 60, wheel: 16 },
      8999: { id: 8999, name: '타이어 후', width: 205, ratio: 60, wheel: 16 },
      9000: { id: 9000, name: '타이어 후', width: 205, ratio: 60, wheel: 16 },
      9001: { id: 9001, name: '타이어 후', width: 205, ratio: 60, wheel: 16 },
      10999: { id: 10999, name: '타이어 후', width: 225, ratio: 60, wheel: 16 },
      11000: { id: 11000, name: '타이어 후', width: 235, ratio: 60, wheel: 18 },
      11001: { id: 11001, name: '타이어 후', width: 225, ratio: 60, wheel: 16 },
      14999: { id: 14999, name: '타이어 후', width: 245, ratio: 50, wheel: 18 },
      15000: { id: 15000, name: '타이어 후', width: 275, ratio: 40, wheel: 19 },
      15001: { id: 15001, name: '타이어 후', width: 245, ratio: 50, wheel: 18 },
    };
    for (const index in rearTires) await this.rearTireRepository.save(rearTires[index]);

    // Swagger default 값 제외하고 저장: frontTire
    const frontTires = {
      4999: { id: 4999, name: '타이어 전', width: 255, ratio: 60, wheel: 16 },
      5000: { id: 5000, name: '타이어 전', width: 255, ratio: 60, wheel: 16 },
      5001: { id: 5001, name: '타이어 전', width: 255, ratio: 60, wheel: 16 },
      8999: { id: 8999, name: '타이어 전', width: 205, ratio: 60, wheel: 16 },
      9000: { id: 9000, name: '타이어 전', width: 205, ratio: 60, wheel: 16 },
      9001: { id: 9001, name: '타이어 전', width: 205, ratio: 60, wheel: 16 },
      10999: { id: 10999, name: '타이어 전', width: 225, ratio: 60, wheel: 16 },
      11000: { id: 11000, name: '타이어 전', width: 235, ratio: 60, wheel: 18 },
      11001: { id: 11001, name: '타이어 전', width: 225, ratio: 60, wheel: 16 },
      14999: { id: 14999, name: '타이어 전', width: 245, ratio: 50, wheel: 18 },
      15000: { id: 15000, name: '타이어 전', width: 245, ratio: 40, wheel: 19 },
      15001: { id: 15001, name: '타이어 전', width: 245, ratio: 50, wheel: 18 },
    };
    for (const index in frontTires) await this.frontTireRepository.save(frontTires[index]);

    // Swagger default 값 제외하고 저장: DRIVING
    const drivings = {
      4999: { id: 4999, frontTire: 4999, rearTire: 4999 },
      5000: { id: 5000, frontTire: 5000, rearTire: 5000 },
      5001: { id: 5001, frontTire: 5001, rearTire: 5001 },
      8999: { id: 8999, frontTire: 8999, rearTire: 8999 },
      9000: { id: 9000, frontTire: 9000, rearTire: 9000 },
      9001: { id: 9001, frontTire: 9001, rearTire: 9001 },
      10999: { id: 10999, frontTire: 10999, rearTire: 10999 },
      11000: { id: 11000, frontTire: 11000, rearTire: 11000 },
      11001: { id: 11001, frontTire: 11001, rearTire: 11001 },
      14999: { id: 14999, frontTire: 14999, rearTire: 14999 },
      15000: { id: 15000, frontTire: 15000, rearTire: 15000 },
      15001: { id: 15001, frontTire: 15001, rearTire: 15001 },
    };
    for (const index in drivings) await this.drivingRepository.save(drivings[index]);

    // Swagger default 값 제외하고 저장: SPEC
    const specs = {
      4999: { id: 4999, driving: 4999 },
      5000: { id: 5000, driving: 5000 },
      5001: { id: 5001, driving: 5001 },
      8999: { id: 8999, driving: 8999 },
      9000: { id: 9000, driving: 9000 },
      9001: { id: 9001, driving: 9001 },
      10999: { id: 10999, driving: 10999 },
      11000: { id: 11000, driving: 11000 },
      11001: { id: 11001, driving: 11001 },
      14999: { id: 14999, driving: 14999 },
      15000: { id: 15000, driving: 15000 },
      15001: { id: 15001, driving: 15001 },
    };
    for (const index in specs) await this.specRepository.save(specs[index]);

    // Swagger default 값 제외하고 저장: TRIM
    const trims = {
      4999: { brandId: 24, brandName: '기아', modelName: '오피러스', trimId: 4999, trimName: 'GH270 최고급형 하이오너형', spec: 4999 },
      5000: { brandId: 24, brandName: '기아', modelName: '오피러스', trimId: 5000, trimName: 'GH270 고급형', spec: 5000 },
      5001: { brandId: 24, brandName: '기아', modelName: '오피러스', trimId: 5001, trimName: 'GH270 웰빙스페셜', spec: 5001 },
      8999: { brandId: 38, brandName: '르노삼성', modelName: 'SM5', trimId: 8999, trimName: 'SE', spec: 8999 },
      9000: { brandId: 38, brandName: '르노삼성', modelName: 'SM5', trimId: 9000, trimName: 'PE', spec: 9000 },
      9001: { brandId: 38, brandName: '르노삼성', modelName: 'SM5', trimId: 9001, trimName: 'SE', spec: 9001 },
      10999: { brandId: 7, brandName: 'Chevrolet', modelName: '임팔라', trimId: 10999, trimName: 'LS', spec: 10999 },
      11000: { brandId: 7, brandName: 'Chevrolet', modelName: '임팔라', trimId: 11000, trimName: 'SS', spec: 11000 },
      11001: { brandId: 7, brandName: 'Chevrolet', modelName: '임팔라', trimId: 11001, trimName: 'LT 3.5', spec: 11001 },
      14999: { brandId: 4, brandName: 'BMW', modelName: '5시리즈', trimId: 14999, trimName: 'GT x드라이브', spec: 14999 },
      15000: { brandId: 4, brandName: 'BMW', modelName: '5시리즈', trimId: 15000, trimName: 'GT x드라이브 익스클루시브', spec: 15000 },
      15001: { brandId: 4, brandName: 'BMW', modelName: '5시리즈', trimId: 15001, trimName: 'GT 30d', spec: 15001 },
    };
    for (const index in trims) await this.baseInfoRepository.save(trims[index]);
  }
}
