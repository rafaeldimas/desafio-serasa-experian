import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Farm } from '@/modules/farm/entities/farm.entity';

@Entity('harvests')
export class Harvest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'text', array: true })
  crops: string[];

  @Column({ type: 'uuid' })
  farmId: string;

  @ManyToOne(() => Farm, (farm) => farm.harvests)
  farm: Farm;
}
