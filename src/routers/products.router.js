const express = require('express');

const { productsController } = require('../controllers');

const validateNewProductFields = require('../middlewares/validateNewProductFields');

const router = express.Router();

router.get('/', productsController.getAllProducts);

router.get('/search', productsController.searchProducts);

router.get('/:id', productsController.getProduct);

router.put('/:id',
  validateNewProductFields,
  productsController.updateProduct);

router.post('/',
  validateNewProductFields,
  productsController.createProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;