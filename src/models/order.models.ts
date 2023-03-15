import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { Order, OrderDetails } from '../interfaces/order.interface';

export default class OrderModel {
  connection:Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<OrderDetails[]> {
    const [orders] = await this.connection.execute<RowDataPacket[]>(`
    SELECT O.id, O.user_id as userId, JSON_ARRAYAGG(P.id) AS productsIds 
    FROM Trybesmith.orders AS O
    LEFT JOIN Trybesmith.products AS P
    ON O.id = P.order_id
    GROUP BY O.id;
    `);

    return orders as OrderDetails[];
  }

  public async create(userId: number): Promise<Order> {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(`
      INSERT INTO Trybesmith.orders (user_id) VALUES (?)
    `, [userId]);

    return { id: insertId, userId };
  }
} 
