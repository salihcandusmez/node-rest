const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'GET request to /products'
  });
});

router.post('/', (req, res) => {
  res.status(200).json({
    message: 'POST request to /products'
  });
});

router.get('/:id', (req, res, next) => {
  let productId = req.params.id;
  if (productId === 'special') {
    res.status(200).json({
      message: 'you discovered special id'
    });
  }
});

module.exports = router;