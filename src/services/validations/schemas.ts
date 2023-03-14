import Joi from 'joi';

const productSchema = Joi.object().keys({
  name: Joi.string().min(3).required(),
  amount: Joi.string().min(3).required(),
}).required();

export default productSchema;