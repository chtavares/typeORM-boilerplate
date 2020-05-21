import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  UpdateDateColumn
} from 'typeorm'
import { User } from './User'

@Entity({ name: 'roles', orderBy: { createdAt: 'DESC' } })
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id = ''

  @Column({ type: 'text', nullable: false })
  name = ''

  @OneToOne(() => User)
  user = undefined
}
