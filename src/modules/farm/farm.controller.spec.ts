import { CreateFarmRequest } from '@/modules/farm/dto/create-farm.request';
import { FarmResponse } from '@/modules/farm/dto/farm.response';
import { UpdateFarmRequest } from '@/modules/farm/dto/update-farm.request';
import { FarmController } from '@/modules/farm/farm.controller';
import {
  createFarmRequestMockFactory,
  farmServiceMockFactory,
  updateFarmRequestMockFactory,
} from '@/modules/farm/mocks/factories.mock';
import { MockType } from '@/shared/tests/mock-type';
import { Test, TestingModule } from '@nestjs/testing';
import { FarmService } from './farm.service';

describe('FarmController', () => {
  let controller: FarmController;
  let service: MockType<FarmService>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmController],
      providers: [
        {
          provide: FarmService,
          useFactory: farmServiceMockFactory,
        },
      ],
    }).compile();

    controller = module.get<FarmController>(FarmController);
    service = module.get<MockType<FarmService>>(FarmService);
  });

  describe('create', () => {
    let createFarmRequest: CreateFarmRequest;
    let farmResponse: FarmResponse;

    beforeAll(async () => {
      createFarmRequest = createFarmRequestMockFactory();
      farmResponse = await controller.create(createFarmRequest);
    });

    it('returns a FarmResponse to create a farm', () => {
      expect(farmResponse).toBeInstanceOf(FarmResponse);
    });

    it('returns a FarmResponse with the id', () => {
      expect(farmResponse.id).toBeDefined();
    });

    it('returns a FarmResponse with the same name', () => {
      expect(farmResponse.name).toEqual(createFarmRequest.name);
    });

    it('returns a FarmResponse with the same totalArea', () => {
      expect(farmResponse.totalArea).toEqual(createFarmRequest.totalArea);
    });

    it('returns a FarmResponse with the same arableArea', () => {
      expect(farmResponse.arableArea).toEqual(createFarmRequest.arableArea);
    });

    it('returns a FarmResponse with the same vegetationArea', () => {
      expect(farmResponse.vegetationArea).toEqual(
        createFarmRequest.vegetationArea,
      );
    });

    it('returns a FarmResponse with the same state', () => {
      expect(farmResponse.state).toEqual(createFarmRequest.state);
    });

    it('returns a FarmResponse with the same city', () => {
      expect(farmResponse.city).toEqual(createFarmRequest.city);
    });

    it('returns a FarmResponse with the same growerId', () => {
      expect(farmResponse.growerId).toEqual(createFarmRequest.growerId);
    });

    it('calls the service', () => {
      expect(service.create).toHaveBeenCalledWith(createFarmRequest);
    });
  });

  describe('findAll', () => {
    let farmsResponse: FarmResponse[];

    beforeAll(async () => {
      farmsResponse = await controller.findAll();
    });

    it('returns a list of FarmResponse', () => {
      expect(farmsResponse).toBeInstanceOf(Array);
      farmsResponse.forEach((farm) => {
        expect(farm).toBeInstanceOf(FarmResponse);
      });
    });

    it('calls the service', () => {
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    const id = '4d102856-12a8-451d-8379-5008c4731653';
    let farmResponse: FarmResponse;

    beforeAll(async () => {
      farmResponse = await controller.findOne(id);
    });

    it('returns a FarmResponse', () => {
      expect(farmResponse).toBeInstanceOf(FarmResponse);
    });

    it('returns a FarmResponse with the same id', () => {
      expect(farmResponse.id).toEqual(id);
    });

    it('calls the service', () => {
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    const id = '4d102856-12a8-451d-8379-5008c4731653';
    let farmResponse: FarmResponse;
    let updateFarmRequest: UpdateFarmRequest;

    beforeAll(async () => {
      updateFarmRequest = updateFarmRequestMockFactory();
      farmResponse = await controller.update(id, updateFarmRequest);
    });

    it('returns a FarmResponse', () => {
      expect(farmResponse).toBeInstanceOf(FarmResponse);
    });

    it('returns a FarmResponse with the same id', () => {
      expect(farmResponse.id).toEqual(id);
    });

    it('returns a FarmResponse with the same name', () => {
      expect(farmResponse.name).toEqual(updateFarmRequest.name);
    });

    it('returns a FarmResponse with the same totalArea', () => {
      expect(farmResponse.totalArea).toEqual(updateFarmRequest.totalArea);
    });

    it('returns a FarmResponse with the same arableArea', () => {
      expect(farmResponse.arableArea).toEqual(updateFarmRequest.arableArea);
    });

    it('returns a FarmResponse with the same vegetationArea', () => {
      expect(farmResponse.vegetationArea).toEqual(
        updateFarmRequest.vegetationArea,
      );
    });

    it('returns a FarmResponse with the same state', () => {
      expect(farmResponse.state).toEqual(updateFarmRequest.state);
    });

    it('returns a FarmResponse with the same city', () => {
      expect(farmResponse.city).toEqual(updateFarmRequest.city);
    });

    it('calls the service', () => {
      expect(service.update).toHaveBeenCalledWith(id, updateFarmRequest);
    });
  });

  describe('remove', () => {
    const id = '4d102856-12a8-451d-8379-5008c4731653';
    let farmResponse: FarmResponse;

    beforeAll(async () => {
      farmResponse = await controller.remove(id);
    });

    it('returns a FarmResponse', () => {
      expect(farmResponse).toBeInstanceOf(FarmResponse);
    });

    it('returns a FarmResponse without the id', () => {
      expect(farmResponse.id).toBeUndefined();
    });

    it('calls the service', () => {
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
