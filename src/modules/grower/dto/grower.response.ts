import { ApiResponseProperty } from '@nestjs/swagger';

export class GrowerResponse {
  @ApiResponseProperty({
    type: 'string',
    format: 'uuid',
    example: '3c0e4c9a-2b4d-4b0e-9c4d-4b0e9c4d4b0e',
  })
  id: string;

  @ApiResponseProperty({
    type: 'string',
    example: 'John Doe',
  })
  name: string;

  @ApiResponseProperty({
    type: 'string',
    example: '123.456.789-10',
    format: 'CPF or CNPJ',
  })
  document: string;
}
