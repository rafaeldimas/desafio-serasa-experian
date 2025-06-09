import { CreateHarvestRequest } from '@/modules/harvest/dto/create-harvest.request';
import { UpdateHarvestRequest } from '@/modules/harvest/dto/update-harvest.request';
import { Harvest } from '@/modules/harvest/entities/harvest.entity';
import { HarvestNotFoundError } from '@/modules/harvest/errors/harvest-not-found';
import { HarvestMapper } from '@/modules/harvest/harvest.mapper';
import {
  createHarvestRequestMockFactory,
  harvestMockFactory,
  harvestRepositoryMockFactory,
  updateHarvestRequestMockFactory,
} from '@/modules/harvest/mocks/factories.mock';
import { MockType } from '@/shared/tests/mock-type';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { HarvestService } from './harvest.service';

describe('HarvestService', () => {
  let service: HarvestService;
  let repository: MockType<Repository<Harvest>>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HarvestService,
        {
          provide: getRepositoryToken(Harvest),
          useFactory: harvestRepositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<HarvestService>(HarvestService);
    repository = module.get<MockType<Repository<Harvest>>>(
      getRepositoryToken(Harvest),
    );
  });

  describe('create', () => {
    let harvest: Harvest;
    let createHarvestRequest: CreateHarvestRequest;

    beforeAll(async () => {
      createHarvestRequest = createHarvestRequestMockFactory();
      harvest = await service.create(createHarvestRequest);
    });

    it('returns a Harvest', () => {
      expect(harvest).toBeInstanceOf(Harvest);
    });

    it('returns a Harvest with the same year', () => {
      expect(harvest.year).toBe(createHarvestRequest.year);
    });

    it('returns a Harvest with the same crops', () => {
      expect(harvest.crops).toEqual(createHarvestRequest.crops);
    });

    it('returns a Harvest with the same farmId', () => {
      expect(harvest.farmId).toBe(createHarvestRequest.farmId);
    });

    it('returns a Harvest with the same id', () => {
      expect(harvest.id).toBeDefined();
    });

    it('calls the repository', () => {
      expect(repository.save).toHaveBeenCalledWith(
        HarvestMapper.requestToEntity(createHarvestRequest),
      );
    });
  });

  describe('findAll', () => {
    let harvests: Harvest[];

    beforeAll(async () => {
      harvests = await service.findAll();
    });

    it('returns a list of Harvests', () => {
      expect(harvests).toBeInstanceOf(Array);
      harvests.forEach((harvest) => {
        expect(harvest).toBeInstanceOf(Harvest);
      });
    });

    it('calls the repository', () => {
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    describe('when finding a Harvest', () => {
      const id = '4d102856-12a8-451d-8379-5008c4731653';
      let harvest: Harvest;

      beforeAll(async () => {
        harvest = await service.findOne(id);
      });

      it('returns a Harvest', () => {
        expect(harvest).toBeInstanceOf(Harvest);
      });

      it('returns a Harvest with the same id', () => {
        expect(harvest.id).toBe(id);
      });

      it('calls the repository', () => {
        expect(repository.findOneBy).toHaveBeenCalledWith({ id });
      });
    });

    describe('when finding a Harvest that does not exist', () => {
      const id = '5fa2d3d2-4e8b-4c3d-8d1d-2d4d5d6d7d8d';
      let error: HarvestNotFoundError;

      beforeAll(async () => {
        jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);

        try {
          await service.findOne(id);
        } catch (err) {
          error = err as HarvestNotFoundError;
        }
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('throws a HarvestNotFoundError', () => {
        expect(error).toBeInstanceOf(HarvestNotFoundError);
      });

      it('throws a HarvestNotFoundError with the correct message', () => {
        expect(error.getMessage()).toEqual(`Harvest id (${id}) not found`);
      });

      it('throws a HarvestNotFoundError with the correct code', () => {
        expect(error.getCode()).toEqual('HARVEST_NOT_FOUND');
      });
    });
  });

  describe('update', () => {
    describe('when updating a Harvest', () => {
      const id = '4d102856-12a8-451d-8379-5008c4731653';
      let harvest: Harvest;
      let updateHarvestRequest: UpdateHarvestRequest;

      beforeAll(async () => {
        updateHarvestRequest = updateHarvestRequestMockFactory();
        harvest = await service.update(id, updateHarvestRequest);
      });

      it('returns a Harvest', () => {
        expect(harvest).toBeInstanceOf(Harvest);
      });

      it('returns a Harvest with the same year', () => {
        expect(harvest.year).toBe(updateHarvestRequest.year);
      });

      it('returns a Harvest with the same crops', () => {
        expect(harvest.crops).toEqual(updateHarvestRequest.crops);
      });

      it('returns a Harvest with the same farmId', () => {
        expect(harvest.farmId).toBe(updateHarvestRequest.farmId);
      });

      it('calls the repository', () => {
        expect(repository.update).toHaveBeenCalledWith(
          { id },
          HarvestMapper.requestToEntity(updateHarvestRequest),
        );
      });
    });

    describe('when updating a Harvest that does not exist', () => {
      const id = '5fa2d3d2-4e8b-4c3d-8d1d-2d4d5d6d7d8d';
      let error: HarvestNotFoundError;

      beforeAll(async () => {
        jest
          .spyOn(repository, 'update')
          .mockResolvedValueOnce({ affected: 0 } as UpdateResult);

        try {
          await service.update(id, updateHarvestRequestMockFactory());
        } catch (err) {
          error = err as HarvestNotFoundError;
        }
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('throws a HarvestNotFoundError', () => {
        expect(error).toBeInstanceOf(HarvestNotFoundError);
      });

      it('throws a HarvestNotFoundError with the correct message', () => {
        expect(error.getMessage()).toEqual(`Harvest id (${id}) not found`);
      });

      it('throws a HarvestNotFoundError with the correct code', () => {
        expect(error.getCode()).toEqual('HARVEST_NOT_FOUND');
      });
    });
  });

  describe('remove', () => {
    describe('when removing a Harvest', () => {
      const id = '4d102856-12a8-451d-8379-5008c4731653';
      let harvest: Harvest;
      let harvestMock: Harvest;

      beforeAll(async () => {
        harvestMock = harvestMockFactory();

        jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(harvestMock);

        harvest = await service.remove(id);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('returns a Harvest', () => {
        expect(harvest).toBeInstanceOf(Harvest);
      });

      it('returns a Harvest without the id', () => {
        expect(harvest.id).toBeUndefined();
      });

      it('calls the repository', () => {
        expect(repository.remove).toHaveBeenCalledWith(harvestMock);
      });
    });

    describe('when removing a Harvest that does not exist', () => {
      const id = '5fa2d3d2-4e8b-4c3d-8d1d-2d4d5d6d7d8d';
      let error: HarvestNotFoundError;

      beforeAll(async () => {
        jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);

        try {
          await service.remove(id);
        } catch (err) {
          error = err as HarvestNotFoundError;
        }
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('throws a HarvestNotFoundError', () => {
        expect(error).toBeInstanceOf(HarvestNotFoundError);
      });

      it('throws a HarvestNotFoundError with the correct message', () => {
        expect(error.getMessage()).toEqual(`Harvest id (${id}) not found`);
      });

      it('throws a HarvestNotFoundError with the correct code', () => {
        expect(error.getCode()).toEqual('HARVEST_NOT_FOUND');
      });
    });
  });
});
