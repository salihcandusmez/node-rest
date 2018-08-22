const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Orders were fetch'
  });
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Orders was created'
  });
});

router.get('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Order details',
    id: req.params.id
  });
});

router.delete('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Order deleted',
    id: req.params.id
  });
});


module.exports = router;