import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Product from '../models/Product';
import CreateProductService from '../services/product/CreateProductService';
import UpdateProductService from '../services/product/UpdateProductService';

class ProductController {
  async create(req: Request, res: Response) {
    const createProductService = new CreateProductService();

    const {
      name,
      description,
      brand,
      category,
      price,
      count_in_stock,
    } = req.body;

    const image = req.file.filename;

    const product = await createProductService.execute({
      name,
      image,
      description,
      brand,
      category,
      price,
      count_in_stock,
    });

    return res.status(201).send(product);
  }

  // GET - /products?offset=5&limit=10
  // GET - /products?sortBy=price:DESC/ASC;name:DESC/ASC
  // ASC = 1 / DESC = -1
  async index(req: Request, res: Response) {
    const productsRepository = getRepository(Product);

    const { offset = 0, limit = 10, sortBy } = req.query;
    const order: Record<string, 'DESC' | 'ASC'> = {};

    if (sortBy) {
      (sortBy as string).split(';').forEach(sort => {
        let [prop, value] = sort.split(':');

        order[prop] = value === 'DESC' ? 'DESC' : 'ASC';
      });

      console.log(order);
    }

    const options = {
      skip: parseInt(offset as string),
      take: parseInt(limit as string),
      order,
    };

    const product = await productsRepository.find(options);

    return res.send(product);
  }

  async show(req: Request, res: Response) {
    const productsRepository = getRepository(Product);

    const { id } = req.params;

    const product = await productsRepository.findOne(id);

    return res.send(product);
  }

  async update(req: Request, res: Response) {
    const updateProductService = new UpdateProductService();

    const { id } = req.params;
    const data = req.body;

    const product = await updateProductService.execute(id, data);

    return res.send(product);
  }

  async destroy(req: Request, res: Response) {
    const productsRepository = getRepository(Product);

    const { id } = req.params;

    await productsRepository.delete({
      id,
    });

    return res.send();
  }
}

export default ProductController;
