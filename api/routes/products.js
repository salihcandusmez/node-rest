const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'GET request to /products'
  });
});

router.post('/', (req, res) => {

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

  product.save()
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));

  res.status(201).json({
    message: 'POST request to /products',
    createdProduct: product
  });

});

router.get('/:id', (req, res, next) => {
  let productId = req.params.id;
  Product.findById(productId)
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Updated product'
  });
});

router.delete('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Deleted product'
  });
});

module.exports = router;