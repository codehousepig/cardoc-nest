import { Test, TestingModule } from '@nestjs/testing';
import { RearTireController } from './rear-tire.controller';
import { RearTireService } from './rear-tire.service';

describe('RearTireController', () => {
  let controller: RearTireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RearTireController],
      providers: [RearTireService],
    }).compile();

    controller = module.get<RearTireController>(RearTireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
