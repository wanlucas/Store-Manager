const { products } = require('../../mocks/products.mock');

const internalError = require('../../mocks/generics');

const newProduct = {
  name: 'RTX 3080',
  id: 56,
};

module.exports = {
  products,
  newProduct,
  internalError,
};