import { ApiResponseProperty } from '@nestjs/swagger';

export class HarvestResponse {
  @ApiResponseProperty({
    type: 'string',
    format: 'uuid',
    example: '3c0e4c9a-2b4d-4b0e-9c4d-4b0e9c4d4b0e',
  })
  id: string;

  @ApiResponseProperty({
    type: 'number',
    example: 2022,
  })
  year: number;

  @ApiResponseProperty({
    type: 'array',
    example: ['soja'],
  })
  crops: string[];

  @ApiResponseProperty({
    type: 'string',
    format: 'uuid',
    example: '3c0e4c9a-2b4d-4b0e-9c4d-4b0e9c4d4b0e',
  })
  farmId: string;
}
