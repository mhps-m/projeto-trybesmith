import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  constructor(private service = new UserService()) {}

  public create = async (req: Request, res: Response): Promise<Response> => {
    const token = await this.service.create(req.body);

    return res.status(201).json({ token });
  };
}