import ProductModel from '../models/product.model';
import connection from '../models/connection';
import { Product, ProductData } from '../interfaces/product.interface';
import validate from './validations/validate';
import productSchema from './validations/schemas';

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
}