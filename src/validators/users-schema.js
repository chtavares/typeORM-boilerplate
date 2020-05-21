import Joi from '@hapi/joi'

import { validateSchema } from 'helpers'

const UsersValidate = {
  create: () =>
    validateSchema({
      body: {
        name: Joi.string().required(),
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string()
          .min(1)
          .max(100)
          .required(),
        roleId: Joi.string().required()
      }
    }),

  update: () =>
    validateSchema({
      body: {
        name: Joi.string().required(),
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string()
          .min(1)
          .max(100)
          .optional(),
        roleId: Joi.string().required()
      }
    })
}

export default UsersValidate
