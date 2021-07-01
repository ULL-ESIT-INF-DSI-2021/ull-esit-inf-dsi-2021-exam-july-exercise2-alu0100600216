import * as express from 'express';
import {Product} from '../models/product';

export const deleteRouter = express.Router();

deleteRouter.delete('/products', async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({
      error: 'A title must be provided',
    });
  }

  try {
    const product =
      await Product.findOneAndDelete({title: req.query.name.toString()});

    if (!product) {
      return res.status(404).send();
    }

    return res.send(product);
  } catch (error) {
    return res.status(400).send();
  }
});

deleteRouter.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).send();
    }

    return res.send(product);
  } catch (error) {
    return res.status(400).send();
  }
});
