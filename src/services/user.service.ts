import createHttpError from 'http-errors';
import UserModel from '../models/user.model';
import connection from '../models/connection';
import { User } from '../interfaces/user.interface';
import validate from './validations/validate';
import { userSchema } from './validations/schemas';
import { createToken } from '../auth/auth';

export default class UserService {
  constructor(public model = new UserModel(connection)) {}

  public async create(user: User): Promise<string> {
    validate(user, userSchema);

    const checkUsernameExists = await this.model.getByUsername(user.username);

    if (checkUsernameExists) {
      throw new createHttpError.Conflict('Username already in use');
    }

    const newUser = await this.model.create(user);

    const token = createToken<User>(newUser);

    return token;
  }
}