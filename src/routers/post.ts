import * as express from 'express';
import {Product} from '../models/product';

export const postRouter = express.Router();

postRouter.post('/products', async (req, res) => {
  const product = new Product(req.body);

  try {
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});
