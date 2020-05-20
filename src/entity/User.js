import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  UpdateDateColumn
} from 'typeorm'
import { RoleEntity } from './Role'

@Entity({ name: 'users', orderBy: { createdAt: 'DESC' } })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id = ''

  @OneToOne(() => RoleEntity)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role = undefined

  @Column({ name: 'role_id', type: 'uuid', nullable: false })
  roleId = ''

  @Column({ type: 'text', nullable: false })
  name = ''

  @Column({ unique: true, type: 'text', nullable: false })
  email = ''

  @Column({ nullable: false, type: 'text' })
  password = ''

  @Column({
    name: 'password_reset_token',
    type: 'text',
    unique: true,
    nullable: true
  })
  passwordResetToken = ''

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt = ''

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt = ''

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt = ''
}
