import createHttpError from 'http-errors';
import { Schema } from 'joi';

export default (data: object | Array<object>, schema: Schema, message?: string) => {
  const { error } = schema.validate(data);

  if (error) {
    throw new createHttpError.BadRequest(message || error.message);
  }
};