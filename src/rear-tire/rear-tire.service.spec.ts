import { Test, TestingModule } from '@nestjs/testing';
import { RearTireService } from './rear-tire.service';

describe('RearTireService', () => {
  let service: RearTireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RearTireService],
    }).compile();

    service = module.get<RearTireService>(RearTireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
