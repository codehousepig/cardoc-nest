import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { UserRole } from '../../enums/user.role.enum';

@Entity()
// export class User extends BaseEntity {
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ nullable: false })
  id: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  trimId: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}
