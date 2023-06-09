import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { authenticateToken } from '../auth/auth';
import { User, UserDetails } from '../interfaces/user.interface';
import UserService from '../services/user.service';

const userService = new UserService();

export default async (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined = req.header('Authorization');

  if (!token) {
    throw new createHttpError.Unauthorized('Token not found');
  }

  const decoded: User = authenticateToken<User>(token);

  const user: UserDetails = await userService.model.getByUsername(decoded.username);

  if (!user || decoded.password !== user.password) {
    throw new createHttpError.Unauthorized('Username or password invalid');
  }

  res.locals.user = user;

  next();
};