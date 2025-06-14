import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Farm } from '@/modules/farm/entities/farm.entity';

export enum DocumentType {
  CPF = 'CPF',
  CNPJ = 'CNPJ',
}

@Entity('growers')
export class Grower {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar' })
  documentType: DocumentType;

  @Column({ type: 'varchar' })
  documentNumber: string;

  @OneToMany(() => Farm, (farm) => farm.grower)
  farms: Farm[];
}
