// import User from 'models/User'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import {
  Unauthorized,
  encryptPassword,
  generateJWTToken,
  sendEmail,
  NotFound
} from '../helpers'
import { templateForgetPassword } from '../utils/reset-password-template'

export const login = async ctx => {
  const { body } = ctx.request

  // const user = await new User({ email: body.email }).fetch().catch(() => {
  //   throw Unauthorized('Unauthorized, User not found')
  // })

  // const isValid = await bcrypt.compare(body.password, user.attributes.password)

  // if (!isValid) {
  //   throw Unauthorized('Unauthorized, password is invalid')
  // }

  // const parsedUser = user.toJSON()

  // return {
  //   ...parsedUser,
  //   token: generateJWTToken({ id: parsedUser.id, role: parsedUser.role })
  // }

  return 'ok'
}

export const forget = async ctx => {
  // const { body } = ctx.request
  // const token = crypto.randomBytes(10).toString('hex')

  // await new User()
  //   .where({ email: body.email })
  //   .save(
  //     {
  //       password_reset_token: token
  //     },
  //     { method: 'update' }
  //   )
  //   .catch(err => {
  //     throw new NotFound('User not found')
  //   })

  // const template = templateForgetPassword(token)

  // await sendEmail(body.email, template)

  return { email: 'test@hotmial.com' }
}

export const reset = async ctx => {
  // const { token, password } = ctx.request.body

  // const newPassword = await encryptPassword(password)

  // return new User()
  //   .where({ password_reset_token: token })
  //   .save(
  //     {
  //       password: newPassword,
  //       password_reset_token: null
  //     },
  //     { method: 'update' }
  //   )
  //   .catch(err => {
  //     throw new NotFound('User not found')
  //   })
  return 'o'
}

export const index = () => 'ola'

export const show = ctx => '2'

export const create = async ctx => {
  // const { body } = ctx.request

  // return new User({
  //   name: body.name,
  //   email: body.email,
  //   password: await encryptPassword(body.password),
  //   role: body.role
  // }).save()

  return 'o'
}

export const update = async ctx => {
  const { body } = ctx.request

  // return new User({ id: ctx.params.id }).save(
  //   {
  //     name: body.name,
  //     email: body.email,
  //     password: await encryptPassword(body.password),
  //     role: body.role
  //   },
  //   { method: 'update' }
  // )

  return '4'
}

export const destroy = ctx => 'ola'

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
