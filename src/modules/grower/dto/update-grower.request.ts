import { PartialType } from '@nestjs/swagger';
import { CreateGrowerRequest } from './create-grower.request';

export class UpdateGrowerRequest extends PartialType(CreateGrowerRequest) {}
