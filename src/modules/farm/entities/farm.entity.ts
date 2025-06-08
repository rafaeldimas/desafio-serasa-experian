import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Grower } from '@/modules/grower/entities/grower.entity';
import { Harvest } from '@/modules/harvest/entities/harvest.entity';

@Entity()
export class Farm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalArea: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  arableArea: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  vegetationArea: number;

  @Column({ type: 'varchar', length: 2 })
  state: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'uuid' })
  growerId: string;

  @ManyToOne(() => Grower, (grower) => grower.farms)
  grower: Grower;

  @OneToMany(() => Harvest, (harvest) => harvest.farm)
  harvests: Harvest[];
}
