import createHttpError from 'http-errors';
import UserModel from '../models/user.model';
import connection from '../models/connection';
import { User, UserDetails } from '../interfaces/user.interface';
import validate from './validations/validate';
import { loginSchema, userSchema } from './validations/schemas';
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

    const { id, username, vocation, password } = newUser;

    const token = createToken<UserDetails>({ id, username, vocation, password });

    return token;
  }

  public async login(user: User): Promise<string> {
    validate(user, loginSchema);

    const getUser = await this.model.getByUsername(user.username);

    if (!getUser || user.password !== getUser.password) {
      throw new createHttpError.Unauthorized('Username or password invalid');
    }

    const { id, username, vocation, password } = getUser;

    const token = createToken<UserDetails>({ id, username, vocation, password });

    return token;
  }
}