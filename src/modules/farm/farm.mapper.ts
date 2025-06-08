import { CreateFarmRequest } from '@/modules/farm/dto/create-farm.request';
import { FarmResponse } from '@/modules/farm/dto/farm.response';
import { UpdateFarmRequest } from '@/modules/farm/dto/update-farm.request';
import { Farm } from '@/modules/farm/entities/farm.entity';
import { plainToClass } from 'class-transformer';

export class FarmMapper {
  static entityToResponse(farm: Farm): FarmResponse {
    return plainToClass(FarmResponse, {
      id: farm.id,
      name: farm.name,
      totalArea: farm.totalArea,
      arableArea: farm.arableArea,
      vegetationArea: farm.vegetationArea,
      state: farm.state,
      city: farm.city,
      growerId: farm.growerId,
    });
  }

  static entitiesToResponse(farms: Farm[]): FarmResponse[] {
    return farms.map((farm) => FarmMapper.entityToResponse(farm));
  }

  static requestToEntity(request: CreateFarmRequest | UpdateFarmRequest): Farm {
    return plainToClass(Farm, {
      name: request.name,
      totalArea: request.totalArea,
      arableArea: request.arableArea,
      vegetationArea: request.vegetationArea,
      state: request.state,
      city: request.city,
      growerId:
        request instanceof UpdateFarmRequest ? undefined : request.growerId,
    });
  }
}
