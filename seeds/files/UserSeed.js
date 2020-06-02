import { encryptPassword } from '../../src/helpers'
import { getConnection } from 'typeorm'
import { User } from '../../src/entity/User'
import { Role } from '../../src/entity/Role'
import uuidv4 from 'uuid/v4'

const create = async data => {
  const userRepository = await getConnection().getRepository(User)
  const roleRepository = await getConnection().getRepository(Role)

  const role = await roleRepository.save({
    name: 'admin'
  })

  await userRepository.save({
    name: 'User',
    password: await encryptPassword('121212'),
    email: 'user@nave.rs',
    roleId: role.id
  })
}

export default create
