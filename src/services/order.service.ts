import OrderModel from '../models/order.models';
import connection from '../models/connection';
import { OrderDetails } from '../interfaces/order.interface';
import validate from './validations/validate';
import { orderSchema } from './validations/schemas';
import ProductService from './product.service';

const productService = new ProductService();

export default class OrderService {
  constructor(public model = new OrderModel(connection)) {}

  public async getAll(): Promise<OrderDetails[]> {
    const orders = await this.model.getAll();

    return orders;
  }

  public async create(userId: number, orderDetails: OrderDetails): Promise<OrderDetails> {
    validate(orderDetails, orderSchema);

    const { productsIds } = orderDetails;

    await productService.checkIds(productsIds);

    const newOrder = await this.model.create(userId);

    await productService.update(productsIds, newOrder.id as number);

    return { userId, productsIds };
  }
}