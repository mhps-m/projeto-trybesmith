import camelize, { Camelize } from 'camelize-ts';
import OrderModel from '../models/order.models';
import connection from '../models/connection';
import Order from '../interfaces/order.interface';

export default class OrderService {
  constructor(public model = new OrderModel(connection)) {}

  public async getAll(): Promise<Camelize<Order[]>> {
    const orders = await this.model.getAll();

    return camelize(orders);
  }
}