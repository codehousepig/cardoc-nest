import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Spec } from '../../spec/entities/spec.entity';

@Entity()
export class BaseInfo {
  @Column({ nullable: false })
  brandId: number;

  @Column({ nullable: false })
  brandName: string;

  @Column({ nullable: false })
  modelName: string;

  @PrimaryColumn()
  trimId: number;

  @Column({ nullable: false })
  trimName: string;

  @OneToOne(() => Spec, { eager: true})
  @JoinColumn()
  spec: Spec;
}
