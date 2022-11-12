const express = require('express');

const { productsController } = require('../controllers');

const validateNewProductFields = require('../middlewares/validateNewProductFields');

const router = express.Router();

router.get('/', productsController.getAllProducts);

router.get('/:id', productsController.getProduct);

router.post('/',
  validateNewProductFields,
  productsController.createProduct);

module.exports = router;