import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Length,
  Min,
} from 'class-validator';

import { TotalAreaIsGreaterOrEqualThan } from '@/modules/farm/validators/total-area.validator';

export class CreateFarmRequest {
  @ApiProperty({
    type: 'string',
    description: 'Farm name',
    example: 'Farm LTDA',
    required: true,
    minLength: 3,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  name: string;

  @ApiProperty({
    type: 'number',
    description:
      'Total area of the farm (greater than or equal to the arable area + vegetation area)',
    example: 30,
    required: true,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @TotalAreaIsGreaterOrEqualThan('arableArea', 'vegetationArea')
  totalArea: number;

  @ApiProperty({
    type: 'number',
    description: 'Arable area of the farm',
    example: 15,
    required: true,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  arableArea: number;

  @ApiProperty({
    type: 'number',
    description: 'Vegetation area of the farm',
    example: 15,
    required: true,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  vegetationArea: number;

  @ApiProperty({
    type: 'string',
    description: 'Farm state',
    example: 'SP',
    required: true,
    minLength: 2,
    maxLength: 2,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  state: string;

  @ApiProperty({
    type: 'string',
    description: 'Farm city',
    example: 'Riberão Preto',
    required: true,
    minLength: 3,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  city: string;

  @ApiProperty({
    type: 'string',
    description: 'Grower ID',
    example: '3c0e4c9a-2b4d-4b0e-9c4d-4b0e9c4d4b0e',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  growerId: string;
}
