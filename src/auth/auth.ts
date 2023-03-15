import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import createHttpError from 'http-errors';

const secret: Secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

export const createToken = <T>(payload: T & (object | string)): string => {
  const options: SignOptions = {
    algorithm: 'HS256',
  };

  const token: string = jwt.sign(payload, secret, options);
  return token;
};

export const authenticateToken = (token: string): void => {
  if (!token) {
    throw new createHttpError.Unauthorized('Token not found');
  }

  const decoded: void = jwt.verify(token, secret, (err, dec) => {
    if (err) throw new createHttpError.Unauthorized('Expired or invalid token');

    return dec;
  });

  return decoded;
};
