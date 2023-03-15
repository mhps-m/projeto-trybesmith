import createHttpError from 'http-errors';
import ProductModel from '../models/product.model';
import connection from '../models/connection';
import { Product, ProductData } from '../interfaces/product.interface';
import validate from './validations/validate';
import { productSchema } from './validations/schemas';

export default class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async create(product: Product): Promise<ProductData> {
    validate(product, productSchema);
    const newProduct = await this.model.create(product);

    return newProduct;
  }

  public async getAll(): Promise<ProductData[]> {
    const products = await this.model.getAll();
    
    return products;
  }

  private async getById(id: number): Promise<ProductData> {
    const product = await this.model.getById(id);

    if (!product) throw new createHttpError.NotFound('Product not found');

    return product;
  }

  public async checkIds(productsIds: number[]) {
    await Promise.all(
      productsIds.map((id: number) => (
        this.getById(id)
      )),
    );
  }

  public async update(productsIds: number[], orderId: number) {
    await Promise.all(
      productsIds.map((id) => this.model.update(id, orderId)),
    );
  }
}