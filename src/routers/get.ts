import * as express from 'express';
import {Product} from '../models/product';

export const getRouter = express.Router();

getRouter.get('/products', async (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};

  try {
    const products = await Product.find(filter);

    if (products.length !== 0) {
      return res.send(products);
    }

    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});

getRouter.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send();
    }

    return res.send(product);
  } catch (error) {
    return res.status(500).send();
  }
});
