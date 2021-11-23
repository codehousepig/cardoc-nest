import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { FrontTire } from '../../front-tire/entities/front-tire.entity';
import { RearTire } from '../../rear-tire/entities/rear-tire.entity';

@Entity()
export class Driving {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true })
  type: string;

  @OneToOne(() => FrontTire, { eager: true })
  @JoinColumn()
  frontTire: FrontTire;

  @OneToOne(() => RearTire, { eager: true })
  @JoinColumn()
  rearTire: RearTire;
}
