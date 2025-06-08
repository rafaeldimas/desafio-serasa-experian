import { ApiResponseProperty } from '@nestjs/swagger';

export class FarmResponse {
  @ApiResponseProperty({
    type: 'string',
    format: 'uuid',
    example: '3c0e4c9a-2b4d-4b0e-9c4d-4b0e9c4d4b0e',
  })
  id: string;

  @ApiResponseProperty({
    type: 'string',
    example: 'Farm LTDA',
  })
  name: string;

  @ApiResponseProperty({
    type: 'number',
    example: 30,
  })
  totalArea: number;

  @ApiResponseProperty({
    type: 'number',
    example: 15,
  })
  arableArea: number;

  @ApiResponseProperty({
    type: 'number',
    example: 15,
  })
  vegetationArea: number;

  @ApiResponseProperty({
    type: 'string',
    example: 'SP',
    format: 'State Code',
  })
  state: string;

  @ApiResponseProperty({
    type: 'string',
    example: 'Ribeirão Preto',
  })
  city: string;

  @ApiResponseProperty({
    type: 'string',
    format: 'uuid',
    example: '3c0e4c9a-2b4d-4b0e-9c4d-4b0e9c4d4b0e',
  })
  growerId: string;
}
