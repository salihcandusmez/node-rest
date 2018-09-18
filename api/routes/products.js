const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const ProductsController = require('../controllers/products');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

//custom filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
// filter
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});

router.get('/', ProductsController.productGetAll);

router.post('/', checkAuth, upload.single('productImage'), ProductsController.productsCreateProduct);

router.get('/:id', ProductsController.productGetProduct);

router.patch('/:id', checkAuth, ProductsController.productUpdateProduct);

router.delete('/:id', checkAuth, ProductsController.productDeleteProduct);

module.exports = router;