import { Test, TestingModule } from '@nestjs/testing';
import { DeedPartiesController } from './deed-parties.controller';
import { DeedPartiesService } from './deed-parties.service';

describe('DeedPartiesController', () => {
  let controller: DeedPartiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeedPartiesController],
      providers: [DeedPartiesService],
    }).compile();

    controller = module.get<DeedPartiesController>(DeedPartiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
