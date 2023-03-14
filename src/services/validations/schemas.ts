import Joi from 'joi';

export const productSchema = Joi.object().keys({
  name: Joi.string().min(3).required(),
  amount: Joi.string().min(3).required(),
}).required();

export const userSchema = Joi.object().keys({
  username: Joi.string().min(3).required(),
  vocation: Joi.string().min(3).required(),
  level: Joi.number().required(),
  password: Joi.string().min(5).required(),
});