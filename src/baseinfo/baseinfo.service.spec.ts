import { Test, TestingModule } from '@nestjs/testing';
import { BaseinfoService } from './baseinfo.service';

describe('BaseinfoService', () => {
  let service: BaseinfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseinfoService],
    }).compile();

    service = module.get<BaseinfoService>(BaseinfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
