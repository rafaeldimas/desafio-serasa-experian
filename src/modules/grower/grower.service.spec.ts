import { Test, TestingModule } from '@nestjs/testing';

import { CreateGrowerRequest } from '@/modules/grower/dto/create-grower.request';
import { UpdateGrowerRequest } from '@/modules/grower/dto/update-grower.request';
import { DocumentType, Grower } from '@/modules/grower/entities/grower.entity';
import { GrowerNotFoundError } from '@/modules/grower/errors/grower-not-found';
import { InvalidDocumentError } from '@/modules/grower/errors/invalid-document';
import { GrowerMapper } from '@/modules/grower/grower.mapper';
import { GrowerService } from '@/modules/grower/grower.service';
import {
  createGrowerRequestMockFactory,
  growerMockFactory,
  repositoryMockFactory,
  updateGrowerRequestMockFactory,
} from '@/modules/grower/mocks/factories.mock';
import { MockType } from '@/shared/tests/mock-type';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository, UpdateResult } from 'typeorm';

describe('GrowerService', () => {
  let service: GrowerService;
  let repository: MockType<Repository<Grower>>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GrowerService,
        {
          provide: getRepositoryToken(Grower),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<GrowerService>(GrowerService);
    repository = module.get<MockType<Repository<Grower>>>(
      getRepositoryToken(Grower),
    );
  });

  describe('create', () => {
    describe('when creating a grower', () => {
      let grower: Grower;
      let growerRequest: CreateGrowerRequest;

      beforeAll(async () => {
        growerRequest = createGrowerRequestMockFactory();
        grower = await service.create(growerRequest);
      });

      it('returns a Grower', () => {
        expect(grower).toBeInstanceOf(Grower);
      });

      it('returns a Grower with the same name', () => {
        expect(grower.name).toEqual(growerRequest.name);
      });

      it('returns a Grower with the same document', () => {
        expect(grower.documentNumber).toEqual(growerRequest.document);
      });

      it('returns a Grower with the document type', () => {
        expect(grower).toHaveProperty('documentType');
      });

      it('returns a Grower with the CPF document type', () => {
        expect(grower.documentType).toEqual(DocumentType.CPF);
      });
    });

    describe('when creating a grower with an invalid document', () => {
      let error: InvalidDocumentError;

      beforeAll(async () => {
        try {
          await service.create(
            createGrowerRequestMockFactory({ document: '123' }),
          );
        } catch (err) {
          error = err as InvalidDocumentError;
        }
      });

      it('throws an error', () => {
        expect(error).toBeInstanceOf(InvalidDocumentError);
      });

      it('throws an error with the correct message', () => {
        expect(error.getMessage()).toEqual('Document is invalid');
      });

      it('throws an error with the correct code', () => {
        expect(error.getCode()).toEqual('INVALID_DOCUMENT');
      });
    });

    describe('when creating a grower with an invalid document', () => {
      let error: InvalidDocumentError;

      beforeAll(async () => {
        try {
          await service.create(
            createGrowerRequestMockFactory({ document: undefined }),
          );
        } catch (err) {
          error = err as InvalidDocumentError;
        }
      });

      it('throws an error', () => {
        expect(error).toBeInstanceOf(InvalidDocumentError);
      });

      it('throws an error with the correct message', () => {
        expect(error.getMessage()).toEqual('Document is invalid');
      });

      it('throws an error with the correct code', () => {
        expect(error.getCode()).toEqual('INVALID_DOCUMENT');
      });
    });
  });

  describe('findAll', () => {
    let growers: Grower[];
    let growersMock: Grower[];

    beforeAll(async () => {
      growersMock = [growerMockFactory(), growerMockFactory()];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(growersMock);

      growers = await service.findAll();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('returns a list of growers equal to 2', () => {
      expect(growers.length).toEqual(2);
    });

    it('returns a list of growers equal to growersMock', () => {
      expect(growers).toEqual(growersMock);
    });
  });

  describe('findOne', () => {
    describe('when finding a grower', () => {
      let grower: Grower;
      let growerMock: Grower;

      beforeAll(async () => {
        growerMock = growerMockFactory();
        jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(growerMock);

        grower = await service.findOne(growerMock.id);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('returns a grower equal to growerMock', () => {
        expect(grower).toEqual(growerMock);
      });
    });

    describe('when finding a grower that does not exist', () => {
      const id = '5fa2d3d2-4e8b-4c3d-8d1d-2d4d5d6d7d8d';
      let error: GrowerNotFoundError;

      beforeAll(async () => {
        jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);

        try {
          await service.findOne(id);
        } catch (err) {
          error = err as GrowerNotFoundError;
        }
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('throws an error', () => {
        expect(error).toBeInstanceOf(GrowerNotFoundError);
      });

      it('throws an error with the correct message', () => {
        expect(error.getMessage()).toEqual(`Grower id (${id}) not found`);
      });

      it('throws an error with the correct code', () => {
        expect(error.getCode()).toEqual('GROWER_NOT_FOUND');
      });
    });
  });

  describe('update', () => {
    describe('when updating a grower', () => {
      const id = '5fa2d3d2-4e8b-4c3d-8d1d-2d4d5d6d7d8d';
      let grower: Grower;
      let growerRequest: UpdateGrowerRequest;

      beforeAll(async () => {
        growerRequest = updateGrowerRequestMockFactory({
          document: '63.260.045/0001-15',
        });

        jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(
          growerMockFactory(
            plainToClass(Grower, {
              ...GrowerMapper.requestToEntity(growerRequest),
              id,
            }),
          ),
        );

        grower = await service.update(id, growerRequest);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('returns a Grower', () => {
        expect(grower).toBeInstanceOf(Grower);
      });

      it('returns a Grower with the same name', () => {
        expect(grower.name).toEqual(growerRequest.name);
      });

      it('returns a Grower with the same document', () => {
        expect(grower.documentNumber).toEqual(growerRequest.document);
      });

      it('returns a Grower with the document type', () => {
        expect(grower).toHaveProperty('documentType');
      });

      it('returns a Grower with the CNPJ document type', () => {
        expect(grower.documentType).toEqual(DocumentType.CNPJ);
      });
    });

    describe('when updating a grower not existing', () => {
      const id = '5fa2d3d2-4e8b-4c3d-8d1d-2d4d5d6d7d8d';
      let error: GrowerNotFoundError;

      beforeAll(async () => {
        jest
          .spyOn(repository, 'update')
          .mockResolvedValueOnce({ affected: 0 } as UpdateResult);
        try {
          await service.update(id, updateGrowerRequestMockFactory());
        } catch (err) {
          error = err as GrowerNotFoundError;
        }
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('throws an error', () => {
        expect(error).toBeInstanceOf(GrowerNotFoundError);
      });

      it('throws an error with the correct message', () => {
        expect(error.getMessage()).toEqual(`Grower id (${id}) not found`);
      });

      it('throws an error with the correct code', () => {
        expect(error.getCode()).toEqual('GROWER_NOT_FOUND');
      });
    });
  });

  describe('remove', () => {
    describe('when removing a grower', () => {
      let grower: Grower;
      let growerMock: Grower;

      beforeAll(async () => {
        growerMock = growerMockFactory();

        jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(growerMock);
        jest.spyOn(repository, 'remove').mockResolvedValueOnce(
          plainToClass(Grower, {
            name: growerMock.name,
            documentNumber: growerMock.documentNumber,
            documentType: growerMock.documentType,
          }),
        );

        grower = await service.remove('5fa2d3d2-4e8b-4c3d-8d1d-2d4d5d6d7d8d');
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('returns a Grower', () => {
        expect(grower).toBeInstanceOf(Grower);
      });

      it('returns a Grower with the same name', () => {
        expect(grower.name).toEqual(growerMock.name);
      });

      it('returns a Grower with the same document', () => {
        expect(grower.documentNumber).toEqual(growerMock.documentNumber);
      });

      it('returns a Grower with the document type', () => {
        expect(grower).toHaveProperty('documentType');
      });

      it('returns a Grower with the same document type', () => {
        expect(grower.documentType).toEqual(growerMock.documentType);
      });

      it('returns a Grower without id', () => {
        expect(grower.id).toBeUndefined();
      });
    });

    describe('when removing a grower not existing', () => {
      const id = '5fa2d3d2-4e8b-4c3d-8d1d-2d4d5d6d7d8d';
      let error: GrowerNotFoundError;

      beforeAll(async () => {
        jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);

        try {
          await service.remove(id);
        } catch (err) {
          error = err as GrowerNotFoundError;
        }
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('throws an error', () => {
        expect(error).toBeInstanceOf(GrowerNotFoundError);
      });

      it('throws an error with the correct message', () => {
        expect(error.getMessage()).toEqual(`Grower id (${id}) not found`);
      });

      it('throws an error with the correct code', () => {
        expect(error.getCode()).toEqual('GROWER_NOT_FOUND');
      });
    });
  });
});
