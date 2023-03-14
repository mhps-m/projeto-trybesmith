import createHttpError from 'http-errors';
import { Schema } from 'joi';

export default (data: object | Array<object>, schema: Schema, message?: string) => {
  const { error } = schema.validate(data);

  if (error) {
    const statusCode = error.message.includes('required') ? 400 : 422;
    throw new createHttpError[statusCode](message || error.message);
  }
};