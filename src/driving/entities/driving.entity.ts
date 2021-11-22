import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { FrontTire } from '../../front-tire/entities/front-tire.entity';

@Entity()
export class Driving {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true })
  type: string;

  @OneToOne(() => FrontTire, { eager: true })
  @JoinColumn()
  frontTire: FrontTire;
  // rearTire
}
