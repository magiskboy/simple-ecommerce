import { Test, TestingModule } from '@nestjs/testing';
import { AttributeSetController } from './attribute-set.controller';

describe('AttributeSetController', () => {
  let controller: AttributeSetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttributeSetController],
    }).compile();

    controller = module.get<AttributeSetController>(AttributeSetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
