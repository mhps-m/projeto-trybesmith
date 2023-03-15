import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { Product, ProductData } from '../interfaces/product.interface';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(product: Product): Promise<ProductData> {
    const { name, amount } = product;
    const result = await this.connection.execute<ResultSetHeader>(`
      INSERT INTO Trybesmith.products (name, amount)
      VALUES (?, ?);
    `, [name, amount]);

    const [{ insertId }] = result;

    return { id: insertId, ...product } as ProductData;
  }

  public async getAll(): Promise<ProductData[]> {
    const result = await this.connection.execute<RowDataPacket[]>(`
      SELECT id, name, amount, order_id as orderId
      FROM Trybesmith.products;
    `);

    const [products] = result;

    return products as ProductData[];
  }

  public async getById(id: number): Promise<ProductData> {
    const [[product]] = await this.connection.execute<RowDataPacket[]>(`
      SELECT id, name, amount, order_id as orderId
      FROM Trybesmith.products
      WHERE id = ?
    `, [id]);

    return product as ProductData;
  }

  public async update(id: number, orderId: number) {
    await this.connection.execute(`
      UPDATE Trybesmith.products 
      SET order_id = ?
      WHERE id = ?
    `, [orderId, id]);
  }
}