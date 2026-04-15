import { Test, TestingModule } from '@nestjs/testing';
import { EncumbrancesService } from './encumbrances.service';

describe('EncumbrancesService', () => {
  let service: EncumbrancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncumbrancesService],
    }).compile();

    service = module.get<EncumbrancesService>(EncumbrancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
