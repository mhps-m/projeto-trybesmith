import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import createHttpError from 'http-errors';

const secret: Secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

export const createToken = <T>(payload: T & (object | string)): string => {
  const options: SignOptions = {
    algorithm: 'HS256',
  };

  const token: string = jwt.sign(payload, secret, options);
  return token;
};

export const authenticateToken = <T>(token: string): T => {
  if (!token) {
    throw new createHttpError.Unauthorized('Token not found');
  }

  try {
    const decoded: JwtPayload = jwt.verify(token, secret) as JwtPayload;

    return decoded as T;
  } catch (err) {
    throw new createHttpError.Unauthorized('Invalid token');
  }
};
