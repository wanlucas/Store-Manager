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
const internalError = require('../../mocks/generics');

const createdSale = {
  itemsSold: newSales,
  insertId: 3,
};

const updatedSale = {
  saleId: 1,
  itemsUpdated: newSales,
};

const { sales } = require('../../mocks/sales.mocks');

module.exports = {
  newSales,
  sales,
  internalError,
  updatedSale,
  createdSale,
};