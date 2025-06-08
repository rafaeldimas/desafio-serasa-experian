import { CreateHarvestRequest } from '@/modules/harvest/dto/create-harvest.request';
import { HarvestResponse } from '@/modules/harvest/dto/harvest.response';
import { UpdateHarvestRequest } from '@/modules/harvest/dto/update-harvest.request';
import { Harvest } from '@/modules/harvest/entities/harvest.entity';
import { plainToClass } from 'class-transformer';

export class HarvestMapper {
  static entityToResponse(harvest: Harvest): HarvestResponse {
    return plainToClass(HarvestResponse, {
      id: harvest.id,
      year: harvest.year,
      crops: harvest.crops,
      farmId: harvest.farmId,
    });
  }

  static entitiesToResponse(harvests: Harvest[]): HarvestResponse[] {
    return harvests.map((harvest) => HarvestMapper.entityToResponse(harvest));
  }

  static requestToEntity(
    request: CreateHarvestRequest | UpdateHarvestRequest,
  ): Harvest {
    return plainToClass(Harvest, {
      year: request.year,
      crops: request.crops,
      farmId:
        request instanceof UpdateHarvestRequest ? undefined : request.farmId,
    });
  }
}
