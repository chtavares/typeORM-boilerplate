import { Column, Entity, PrimaryGeneratedColumn, OneTo } from 'typeorm'
import { User } from './User'

@Entity({ name: 'roles', orderBy: { createdAt: 'DESC' } })
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id = ''

  @Column({ type: 'text', nullable: false })
  name = ''

  @OneToMany(() => User)
  user = undefined
}
