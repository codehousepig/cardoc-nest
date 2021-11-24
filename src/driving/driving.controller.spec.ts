import { Test, TestingModule } from '@nestjs/testing';
import { DrivingController } from './driving.controller';
import { DrivingService } from './driving.service';

describe('DrivingController', () => {
  let controller: DrivingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrivingController],
      providers: [DrivingService],
    }).compile();

    controller = module.get<DrivingController>(DrivingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
