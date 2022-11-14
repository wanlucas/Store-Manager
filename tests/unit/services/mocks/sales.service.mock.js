const newSales = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const createdSale = {
  itemsSold: newSales,
  insertId: 3,
};

const { sales } = require('../../mocks/sales.mocks');

const saleCreationFailed = {
  message: 'Something went wrong',
};

module.exports = {
  newSales,
  sales,
  saleCreationFailed,
  createdSale,
};