import { Test, TestingModule } from '@nestjs/testing';
import { FrontTireService } from './front-tire.service';

describe('FrontTireService', () => {
  let service: FrontTireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FrontTireService],
    }).compile();

    service = module.get<FrontTireService>(FrontTireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
