import { Test, TestingModule } from '@nestjs/testing';
import { MiddleController } from './middle.controller';

describe('MiddleController', () => {
  let controller: MiddleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiddleController],
    }).compile();

    controller = module.get<MiddleController>(MiddleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
