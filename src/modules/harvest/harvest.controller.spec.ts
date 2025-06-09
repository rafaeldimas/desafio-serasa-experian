import { CreateHarvestRequest } from '@/modules/harvest/dto/create-harvest.request';
import { HarvestResponse } from '@/modules/harvest/dto/harvest.response';
import {
  createHarvestRequestMockFactory,
  harvestServiceMockFactory,
} from '@/modules/harvest/mocks/factories.mock';
import { MockType } from '@/shared/tests/mock-type';
import { Test, TestingModule } from '@nestjs/testing';
import { HarvestController } from './harvest.controller';
import { HarvestService } from './harvest.service';

describe('HarvestController', () => {
  let controller: HarvestController;
  let service: MockType<HarvestService>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HarvestController],
      providers: [
        {
          provide: HarvestService,
          useFactory: harvestServiceMockFactory,
        },
      ],
    }).compile();

    controller = module.get<HarvestController>(HarvestController);
    service = module.get<MockType<HarvestService>>(HarvestService);
  });

  describe('create', () => {
    let harvestResponse: HarvestResponse;
    let createHarvestRequest: CreateHarvestRequest;

    beforeAll(async () => {
      createHarvestRequest = createHarvestRequestMockFactory();
      harvestResponse = await controller.create(createHarvestRequest);
    });

    it('returns a HarvestResponse', () => {
      expect(harvestResponse).toBeInstanceOf(HarvestResponse);
    });

    it('returns a HarvestResponse with the same id', () => {
      expect(harvestResponse.id).toBeDefined();
    });

    it('returns a HarvestResponse with the same year', () => {
      expect(harvestResponse.year).toBe(createHarvestRequest.year);
    });

    it('returns a HarvestResponse with the same crops', () => {
      expect(harvestResponse.crops).toEqual(createHarvestRequest.crops);
    });

    it('returns a HarvestResponse with the same farmId', () => {
      expect(harvestResponse.farmId).toBe(createHarvestRequest.farmId);
    });

    it('calls the service', () => {
      expect(service.create).toHaveBeenCalledWith(createHarvestRequest);
    });
  });

  describe('findAll', () => {
    let harvests: HarvestResponse[];

    beforeAll(async () => {
      harvests = await controller.findAll();
    });

    it('returns a list of HarvestResponses', () => {
      expect(harvests).toBeInstanceOf(Array);
      harvests.forEach((harvest) => {
        expect(harvest).toBeInstanceOf(HarvestResponse);
      });
    });

    it('calls the service', () => {
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    const id = '4d102856-12a8-451d-8379-5008c4731653';
    let harvestResponse: HarvestResponse;

    beforeAll(async () => {
      harvestResponse = await controller.findOne(id);
    });

    it('returns a HarvestResponse', () => {
      expect(harvestResponse).toBeInstanceOf(HarvestResponse);
    });

    it('returns a HarvestResponse with the same id', () => {
      expect(harvestResponse.id).toBe(id);
    });

    it('calls the service', () => {
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    const id = '4d102856-12a8-451d-8379-5008c4731653';
    let harvestResponse: HarvestResponse;
    let updateHarvestRequest: CreateHarvestRequest;

    beforeAll(async () => {
      updateHarvestRequest = createHarvestRequestMockFactory();
      harvestResponse = await controller.update(id, updateHarvestRequest);
    });

    it('returns a HarvestResponse', () => {
      expect(harvestResponse).toBeInstanceOf(HarvestResponse);
    });

    it('returns a HarvestResponse with the same id', () => {
      expect(harvestResponse.id).toBe(id);
    });

    it('returns a HarvestResponse with the same year', () => {
      expect(harvestResponse.year).toBe(updateHarvestRequest.year);
    });

    it('returns a HarvestResponse with the same crops', () => {
      expect(harvestResponse.crops).toEqual(updateHarvestRequest.crops);
    });

    it('returns a HarvestResponse with the same farmId', () => {
      expect(harvestResponse.farmId).toBe(updateHarvestRequest.farmId);
    });

    it('calls the service', () => {
      expect(service.update).toHaveBeenCalledWith(id, updateHarvestRequest);
    });
  });

  describe('remove', () => {
    const id = '4d102856-12a8-451d-8379-5008c4731653';

    beforeAll(async () => {
      await controller.remove(id);
    });

    it('calls the service', () => {
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
