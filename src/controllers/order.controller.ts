import { Request, Response } from 'express';
import OrderService from '../services/order.service';

export default class OrderController {
  constructor(private service = new OrderService()) {}

  public getAll = async (_req: Request, res: Response): Promise<Response> => {
    const orders = await this.service.getAll();

    return res.status(200).json(orders);
  };
}