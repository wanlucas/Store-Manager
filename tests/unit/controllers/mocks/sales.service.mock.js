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
  insertId: 5,
  affectedRows: 3,
};

const saleCreationFailed = {
  message: 'Something went wrong',
};

module.exports = {
  newSale,
  saleCreatedSuccessfully,
  saleCreationFailed,
  sales,
};