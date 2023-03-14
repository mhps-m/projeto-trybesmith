import ProductModel from '../models/product.model';
import connection from '../models/connection';
import { Product, ProductData } from '../interfaces/products.interface';

export default class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async create(product: Product): Promise<ProductData> {
    const newProduct = await this.model.create(product);

    return newProduct;
  }
}