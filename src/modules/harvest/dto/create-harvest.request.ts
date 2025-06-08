import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateHarvestRequest {
  @ApiProperty({
    type: 'number',
    description: 'Harvest year',
    example: 2022,
    required: true,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  year: number;

  @ApiProperty({
    type: 'array',
    description: 'List of crops',
    example: ['soja'],
    examples: ['soja', 'milho', 'café'],
    required: false,
    default: [],
    isArray: true,
  })
  @IsArray()
  crops?: string[] = [];

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'Farm id',
    example: '3c0e4c9a-2b4d-4b0e-9c4d-4b0e9c4d4b0e',
    required: true,
  })
  @IsUUID()
  farmId: string;
}
