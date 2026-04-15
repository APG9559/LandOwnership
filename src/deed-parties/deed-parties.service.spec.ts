import { Test, TestingModule } from '@nestjs/testing';
import { DeedPartiesService } from './deed-parties.service';

describe('DeedPartiesService', () => {
  let service: DeedPartiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeedPartiesService],
    }).compile();

    service = module.get<DeedPartiesService>(DeedPartiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
