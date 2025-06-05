import { Test, TestingModule } from '@nestjs/testing';
import { GrowerService } from './grower.service';

describe('GrowerService', () => {
  let service: GrowerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrowerService],
    }).compile();

    service = module.get<GrowerService>(GrowerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
