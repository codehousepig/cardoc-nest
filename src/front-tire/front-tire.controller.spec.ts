import { Test, TestingModule } from '@nestjs/testing';
import { FrontTireController } from './front-tire.controller';
import { FrontTireService } from './front-tire.service';

describe('FrontTireController', () => {
  let controller: FrontTireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FrontTireController],
      providers: [FrontTireService],
    }).compile();

    controller = module.get<FrontTireController>(FrontTireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
