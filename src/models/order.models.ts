import { Pool, RowDataPacket } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class OrderModel {
  connection:Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const [orders] = await this.connection.execute<RowDataPacket[]>(`
    SELECT O.id, O.user_id, JSON_ARRAYAGG(P.id) AS products_ids 
    FROM Trybesmith.orders AS O
    LEFT JOIN Trybesmith.products AS P
    ON O.id = P.order_id
    GROUP BY O.id;
    `);

    return orders as Order[];
  }
} 
