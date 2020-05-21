import { User } from 'entity/User'
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
    .getRepository(User)
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
    .getRepository(User)
    .findOneOrFail({ email })

  await getConnection()
    .getRepository(User)
    .merge(user, { passwordResetToken: token })
  await getConnection()
    .getRepository(User)
    .save(user)

  const template = templateForgetPassword(token)

  await sendEmail(body.email, template)

  return { user }
}

export const reset = async ctx => {
  const { token, password } = ctx.request.body
  const newPassword = await encryptPassword(password)

  const user = await getConnection()
    .getRepository(User)
    .findOneOrFail({ passwordResetToken: token })

  await getConnection()
    .getRepository(User)
    .merge(user, { passwordResetToken: null, password: newPassword })
  await getConnection()
    .getRepository(User)
    .save(user)

  return user
}

export const index = () =>
  getConnection()
    .getRepository(User)
    .createQueryBuilder()
    .getMany()

export const show = ctx =>
  getConnection()
    .getRepository(User)
    .findOneOrFail(ctx.params.id)

export const create = async ctx => {
  const { body } = ctx.request

  return getConnection()
    .getRepository(User)
    .save({ ...body, password: await encryptPassword(body.password) })
}

export const update = async ctx => {
  const { body } = ctx.request

  const user = await getConnection()
    .getRepository(User)
    .findOneOrFail({ id: ctx.params.id })

  await getConnection()
    .getRepository(User)
    .merge(user, body)
  await getConnection()
    .getRepository(User)
    .save(user)

  return user
}

export const destroy = ctx => {
  getConnection()
    .getRepository(User)
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
