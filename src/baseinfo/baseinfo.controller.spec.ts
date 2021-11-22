import { Test, TestingModule } from '@nestjs/testing';
import { BaseinfoController } from './baseinfo.controller';
import { BaseinfoService } from './baseinfo.service';

describe('BaseinfoController', () => {
  let controller: BaseinfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaseinfoController],
      providers: [BaseinfoService],
    }).compile();

    controller = module.get<BaseinfoController>(BaseinfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
