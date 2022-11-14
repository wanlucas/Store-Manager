const express = require('express');

const { salesController } = require('../controllers');

const validateNewSaleFields = require('../middlewares/validateNewSaleFields');

const router = express.Router();

router.get('/',
  salesController.getSales);

router.get('/:id',
  salesController.getSaleById);

router.post('/',
  validateNewSaleFields,
  salesController.createSale);

router.delete('/:id', salesController.deleteSale);

module.exports = router;