import { Test, TestingModule } from '@nestjs/testing';
import { GrowerController } from './grower.controller';
import { GrowerService } from './grower.service';

describe('GrowerController', () => {
  let controller: GrowerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrowerController],
      providers: [GrowerService],
    }).compile();

    controller = module.get<GrowerController>(GrowerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
