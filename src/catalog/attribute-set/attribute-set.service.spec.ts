import { Test, TestingModule } from '@nestjs/testing';
import { AttributeSetService } from './attribute-set.service';

describe('AttributeSetService', () => {
  let service: AttributeSetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttributeSetService],
    }).compile();

    service = module.get<AttributeSetService>(AttributeSetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
