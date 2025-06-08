import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateGrowerRequest {
  @ApiProperty({
    type: 'string',
    description: 'Grower name',
    example: 'John Doe',
    required: true,
    minLength: 3,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'Grower document (CPF or CNPJ)',
    example: '123.456.789-10',
    examples: [
      '123.456.789-10',
      '12.345.678/0001-00',
      '12345678910',
      '12345678000100',
    ],
    required: true,
    minLength: 11,
    maxLength: 18,
  })
  @IsNotEmpty()
  @IsString()
  @Length(11, 18)
  document: string;
}
