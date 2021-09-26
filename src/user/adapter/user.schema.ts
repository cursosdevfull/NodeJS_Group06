import Joi from 'joi';

export const schemas = {
  GET_ONE: Joi.object({
    id: Joi.number().integer().required(),
    authorization: Joi.string().required(),
  }),

  UPDATE: Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
    photo: Joi.string(),
    roles: Joi.array().items(Joi.number()),
  }),

  DELETE: Joi.object({
    id: Joi.number().integer().required(),
  }),

  GET_PAGE: Joi.object({
    page: Joi.number().integer().required(),
  }),

  INSERT: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    photo: Joi.string().required(),
    roles: Joi.array().items(Joi.number()).required(),
    authorization: Joi.string().required(),
  }),
};
