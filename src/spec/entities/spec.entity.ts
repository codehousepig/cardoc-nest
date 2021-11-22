import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Driving } from '../../driving/entities/driving.entity';

@Entity()
export class Spec {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true, default: null })
  imageUrl: string;

  @Column({ nullable: true, default: null })
  fuel: string;

  @Column({ nullable: true, default: null })
  dimension: string;

  @Column({ nullable: true, default: null })
  engine: string;

  @OneToOne(() => Driving, { eager: true })
  @JoinColumn()
  driving: Driving;
}
