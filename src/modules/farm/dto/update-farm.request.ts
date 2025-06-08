import { OmitType, PartialType } from '@nestjs/swagger';

import { CreateFarmRequest } from '@/modules/farm/dto/create-farm.request';

export class UpdateFarmRequest extends PartialType(
  OmitType(CreateFarmRequest, ['growerId']),
) {}
