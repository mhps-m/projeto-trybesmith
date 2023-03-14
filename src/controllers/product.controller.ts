import { Request, Response } from 'express';
import ProductService from '../services/product.service';

export default class ProductController {
  constructor(private productService = new ProductService()) {}

  public create = async (req: Request, res: Response): Promise<Response> => {
    const product = await this.productService.create(req.body);

    return res.status(201).json(product);
  };
}