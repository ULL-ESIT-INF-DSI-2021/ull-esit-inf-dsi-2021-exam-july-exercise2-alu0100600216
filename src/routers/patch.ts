import * as express from 'express';
import {Product} from '../models/product';

export const patchRouter = express.Router();

patchRouter.patch('/products', async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({
      error: 'A name must be provided',
    });
  }

  const allowedUpdates = ['name','description','fabricationDate','expirationDate','batchNumber','ingredients','nutritionalInfo','weight','price','stock'];
  //const allowedUpdates = ['name','description','fabricationDate','expirationDate','batchNumber','ingredients','weight','price','stock'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
    actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted',
    });
  }

  try {
    const product =
    await Product.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).send();
    }

    return res.send(product);
  } catch (error) {
    return res.status(400).send(error);
  }
});

patchRouter.patch('/products/:id', async (req, res) => {
  const allowedUpdates = ['name','description','fabricationDate','expirationDate','batchNumber','ingredients','nutritionalInfo','weight','price','stock'];
  //const allowedUpdates = ['name','description','fabricationDate','expirationDate','batchNumber','ingredients','weight','price','stock'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted',
    });
  }

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).send();
    }

    return res.send(product);
  } catch (error) {
    return res.status(400).send(error);
  }
});
