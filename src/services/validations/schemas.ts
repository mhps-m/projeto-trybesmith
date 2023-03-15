import Joi from 'joi';

export const productSchema = Joi.object().keys({
  name: Joi.string().min(3).required(),
  amount: Joi.string().min(3).required(),
}).required();

export const userSchema = Joi.object().keys({
  username: Joi.string().min(3).required(),
  vocation: Joi.string().min(3).required(),
  level: Joi.number().min(1).required(),
  password: Joi.string().min(8).required(),
});

export const loginSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const productsIdsSchema = Joi.array().items(
  Joi.number().min(1).required(),
).required();

export const orderSchema = Joi.object().keys({
  productsIds: productsIdsSchema,
}).required().messages({
  'number.base': '"productsIds" must include only numbers',
  'array.includesRequiredUnknowns': '"productsIds" must include only numbers',
});