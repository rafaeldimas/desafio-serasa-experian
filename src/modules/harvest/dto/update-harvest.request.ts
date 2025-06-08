import { PartialType } from '@nestjs/swagger';
import { CreateHarvestRequest } from './create-harvest.request';

export class UpdateHarvestRequest extends PartialType(CreateHarvestRequest) {}
