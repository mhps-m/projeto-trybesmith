import { Request, Response } from 'express';
import { UserDetails } from '../interfaces/user.interface';
import OrderService from '../services/order.service';

export default class OrderController {
  constructor(private service = new OrderService()) {}

  public getAll = async (_req: Request, res: Response): Promise<Response> => {
    const orders = await this.service.getAll();

    return res.status(200).json(orders);
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    const user: UserDetails = res.locals.user as UserDetails;

    const newOrder = await this.service.create(user.id, req.body);

    return res.status(201).json(newOrder);
  };
}