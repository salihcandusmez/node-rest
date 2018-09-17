const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

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

const Product = require('../models/product');

router.get('/', (req, res) => {
  Product.find().select('name price _id productImage').exec().then(docs => {
    let response = {
      count: docs.length,
      products: docs.map(doc => {
        return {
          name: doc.name,
          price: doc.price,
          productImage: doc.productImage,
          _id: doc._id,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/prodocts/' + doc._id
          }
        }
      })
    };
    // if(docs.length >= 0) {
    res.status(200).json(response);
    // } else {
    //   res.status(404).json({
    //     message: 'No entries found'
    //   });
    // }
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
});

router.post('/', checkAuth, upload.single('productImage'), (req, res) => {
  console.log(req.file);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  });

  product.save().then(result => {
    res.status(201).json({
      message: 'Created product successfully',
      createdProduct: {
        name: result.name,
        price: result.price,
        _id: result._id,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/prodocts/' + result._id
        }
      }
    });
  }).catch(err => {
    res.status(500).json({ error: err });
  });
});

router.get('/:id', (req, res, next) => {
  let productId = req.params.id;
  Product.findById(productId).select('name price _id').exec().then(doc => {
    if (doc) {
      res.status(200).json({
        product: doc,
        request: {
          type: 'GET',
          ulr: 'http://localhost/products'
        }
      });
    } else {
      res.status(404).json({ message: 'No valid found for provided ID' });
    }
  }).catch(err => {
    res.status(500).json({ error: err });
  });
});

router.patch('/:id', checkAuth, (req, res, next) => {
  let id = req.params.id;
  let updateOps = {};
  for (let ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps }).exec().then(result => {
    res.status(200).json({
      message: 'Product updated',
      request: {
        type: 'GET',
        url: 'http://localhost/products/' + id
      }
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

router.delete('/:id', checkAuth, (req, res, next) => {
  let id = req.params.id;
  Product.remove({ _id: id }).exec().then(result => {
    res.status(200).json({
      message: 'Prouct deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/products',
        data: { name: 'String', price: 'Number' }
      }
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
});

module.exports = router;