const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'GET request to /products'
  });
});

router.post('/', (req, res) => {
  let product = {
    name: req.body.name,
    price: req.body.price
  };
  res.status(201).json({
    message: 'POST request to /products',
    createdProduct: product
  });
});

router.get('/:id', (req, res, next) => {
  let productId = req.params.id;
  if (productId === 'special') {
    res.status(200).json({
      message: 'you discovered special id',
      id: productId
    });
  } else {
    res.status(200).json({
      message: 'You passed an ID'
    });
  }
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