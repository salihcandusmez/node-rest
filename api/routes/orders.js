const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/orders');

router.get('/', checkAuth, OrdersController.orderGetAll);

router.post('/', checkAuth, OrdersController.ordersCreateOrder);

router.get('/:id', checkAuth, OrdersController.ordersGetOrder);

router.delete('/:id', checkAuth, OrdersController.orderDeleteOrder);

module.exports = router;