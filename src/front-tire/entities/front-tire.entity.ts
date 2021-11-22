import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class FrontTire {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column()
  width: number;

  @Column()
  ratio: number;

  @Column()
  wheel: number;

  @Column({ nullable: true })
  unit: string;

  @Column({ nullable: true })
  multiValues: string;
}
