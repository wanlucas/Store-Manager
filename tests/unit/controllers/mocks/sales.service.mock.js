const newSale = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const { sales } = require('../../mocks/sales.mocks');

const saleCreatedSuccessfully = {
  error: null,
  output: {
    insertId: 5,
    affectedRows: 3,
  },
};

const { internalError } = require('../../mocks/generics');

const successfulSaleUpdate = {
  error: null,
  output: {
    saleId: 1,
    itemsUpdated: newSale,
  },
};

module.exports = {
  newSale,
  saleCreatedSuccessfully,
  internalError,
  successfulSaleUpdate,
  sales,
};