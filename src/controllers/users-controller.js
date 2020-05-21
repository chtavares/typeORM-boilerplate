import { UserEntity } from 'entity/User'
import { getConnection } from 'typeorm'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import {
  Unauthorized,
  encryptPassword,
  generateJWTToken,
  sendEmail
} from '../helpers'
import { templateForgetPassword } from '../utils/reset-password-template'

export const login = async ctx => {
  const { body } = ctx.request
  const user = await getConnection()
    .getRepository(UserEntity)
    .findOneOrFail({ email: body.email })
    .catch(() => {
      throw Unauthorized('Unauthorized, User not found')
    })

  const isValid = await bcrypt.compare(body.password, user.password)

  if (!isValid) {
    throw Unauthorized('Unauthorized, password is invalid')
  }

  return {
    user,
    token: generateJWTToken({ id: user.id, role: user.roleId })
  }
}

export const forget = async ctx => {
  const {
    body: { email }
  } = ctx.request

  const token = crypto.randomBytes(10).toString('hex')

  const user = await getConnection()
    .getRepository(UserEntity)
    .findOneOrFail({ email })

  await getConnection()
    .getRepository(UserEntity)
    .merge(user, { passwordResetToken: token })
  await getConnection()
    .getRepository(UserEntity)
    .save(user)

  const template = templateForgetPassword(token)

  await sendEmail(body.email, template)

  return { user }
}

export const reset = async ctx => {
  const { token, password } = ctx.request.body
  const newPassword = await encryptPassword(password)

  const user = await getConnection()
    .getRepository(UserEntity)
    .findOneOrFail({ passwordResetToken: token })

  await getConnection()
    .getRepository(UserEntity)
    .merge(user, { passwordResetToken: null, password: newPassword })
  await getConnection()
    .getRepository(UserEntity)
    .save(user)

  return user
}

export const index = () =>
  getConnection()
    .getRepository(UserEntity)
    .createQueryBuilder()
    .getMany()

export const show = ctx =>
  getConnection()
    .getRepository(UserEntity)
    .findOneOrFail(ctx.params.id)

export const create = async ctx => {
  const { body } = ctx.request

  return getConnection()
    .getRepository(UserEntity)
    .save({ ...body, password: await encryptPassword(body.password) })
}

export const update = async ctx => {
  const { body } = ctx.request

  const user = await getConnection()
    .getRepository(UserEntity)
    .findOneOrFail({ id: ctx.params.id })

  await getConnection()
    .getRepository(UserEntity)
    .merge(user, body)
  await getConnection()
    .getRepository(UserEntity)
    .save(user)

  return user
}

export const destroy = ctx => {
  getConnection()
    .getRepository(UserEntity)
    .softDelete(ctx.params.id)
  const isAffected = isDeleted.raw.affectedRows > 0

  return isAffected
}

export default {
  login,
  index,
  show,
  create,
  update,
  destroy,
  forget,
  reset
}
