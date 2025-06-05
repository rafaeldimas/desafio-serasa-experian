import { PartialType } from '@nestjs/swagger';
import { CreateGrowerDto } from './create-grower.dto';

export class UpdateGrowerDto extends PartialType(CreateGrowerDto) {}
