// import camelize from 'camelize';
import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Product, ProductData } from '../interfaces/products.interface';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(product: Product): Promise<ProductData> {
    const { name, amount } = product;
    const result = await this.connection.execute<ResultSetHeader>(`
      INSERT INTO Trybesmith.products (name, amount)
      VALUES (?, ?)
    `, [name, amount]);

    const [{ insertId }] = result;

    return { id: insertId, ...product } as ProductData;
  }
}