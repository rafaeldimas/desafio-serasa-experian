import { GrowerResponse } from '@/modules/grower/dto/grower.response';
import { UpdateGrowerRequest } from '@/modules/grower/dto/update-grower.request';
import {
  createGrowerRequestMockFactory,
  growerServiceMockFactory,
  updateGrowerRequestMockFactory,
} from '@/modules/grower/mocks/factories.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { GrowerController } from './grower.controller';
import { GrowerService } from './grower.service';

describe('GrowerController', () => {
  let controller: GrowerController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrowerController],
      providers: [
        {
          provide: GrowerService,
          useFactory: growerServiceMockFactory,
        },
      ],
    }).compile();

    controller = module.get<GrowerController>(GrowerController);
  });

  describe('create', () => {
    let growerResponse: GrowerResponse;
    const createGrowerRequestMock = createGrowerRequestMockFactory();

    beforeAll(async () => {
      growerResponse = await controller.create(createGrowerRequestMock);
    });

    it('returns a GrowerResponse', () => {
      expect(growerResponse).toBeInstanceOf(GrowerResponse);
    });

    it('returns a GrowerResponse with the id', () => {
      expect(growerResponse).toHaveProperty('id');
    });

    it('returns a GrowerResponse with the same name', () => {
      expect(growerResponse.name).toEqual(createGrowerRequestMock.name);
    });

    it('returns a GrowerResponse with the same document', () => {
      expect(growerResponse.document).toEqual(createGrowerRequestMock.document);
    });
  });

  describe('findAll', () => {
    let growerResponse: GrowerResponse[];

    beforeAll(async () => {
      growerResponse = await controller.findAll();
    });

    it('returns a list of GrowerResponse', () => {
      expect(growerResponse).toBeInstanceOf(Array);
      growerResponse.forEach((grower) => {
        expect(grower).toBeInstanceOf(GrowerResponse);
      });
    });
  });

  describe('findOne', () => {
    const id = '5fa2d3d2-4e8b-4c3d-8d1d-2d4d5d6d7d8d';
    let growerResponse: GrowerResponse;

    beforeAll(async () => {
      growerResponse = await controller.findOne(id);
    });

    it('returns a GrowerResponse', () => {
      expect(growerResponse).toBeInstanceOf(GrowerResponse);
    });

    it('returns a GrowerResponse with the same id', () => {
      expect(growerResponse.id).toEqual(id);
    });
  });

  describe('update', () => {
    const id = '5fa2d3d2-4e8b-4c3d-8d1d-2d4d5d6d7d8d';
    let growerResponse: GrowerResponse;
    let updateGrowerRequestMock: UpdateGrowerRequest;

    beforeAll(async () => {
      updateGrowerRequestMock = updateGrowerRequestMockFactory();
      growerResponse = await controller.update(id, updateGrowerRequestMock);
    });

    it('returns a GrowerResponse', () => {
      expect(growerResponse).toBeInstanceOf(GrowerResponse);
    });

    it('returns a GrowerResponse with the same id', () => {
      expect(growerResponse.id).toEqual(id);
    });

    it('returns a GrowerResponse with the same name', () => {
      expect(growerResponse.name).toEqual(updateGrowerRequestMock.name);
    });

    it('returns a GrowerResponse with the same document', () => {
      expect(growerResponse.document).toEqual(updateGrowerRequestMock.document);
    });

    it('returns a GrowerResponse without the document type', () => {
      expect(growerResponse).not.toHaveProperty('documentType');
    });
  });

  describe('remove', () => {
    const id = '5fa2d3d2-4e8b-4c3d-8d1d-2d4d5d6d7d8d';
    let growerResponse: GrowerResponse;

    beforeAll(async () => {
      growerResponse = await controller.remove(id);
    });

    it('returns a GrowerResponse', () => {
      expect(growerResponse).toBeInstanceOf(GrowerResponse);
    });
  });
});
