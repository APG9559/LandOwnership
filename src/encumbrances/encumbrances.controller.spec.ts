import { Test, TestingModule } from '@nestjs/testing';
import { EncumbrancesController } from './encumbrances.controller';
import { EncumbrancesService } from './encumbrances.service';

describe('EncumbrancesController', () => {
  let controller: EncumbrancesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EncumbrancesController],
      providers: [EncumbrancesService],
    }).compile();

    controller = module.get<EncumbrancesController>(EncumbrancesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
