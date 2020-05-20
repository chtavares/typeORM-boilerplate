import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  UpdateDateColumn
} from 'typeorm'
import { UserEntity } from './User'

@Entity({ name: 'roles', orderBy: { createdAt: 'DESC' } })
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id = ''

  @Column({ type: 'text', nullable: false })
  name = ''

  @OneToOne(() => UserEntity)
  user = undefined
}
