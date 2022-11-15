const { products } = require('../../mocks/products.mock');

const { internalError } = require('../../mocks/generics');

const updatedProduct = {
  error: null,
  output: {
    name: 'Caneta azul',
  },
};

const newProduct = {
  error: null,
  output: { 
    name: 'Corsa azul',
    id: 10,
  },
};

module.exports = {
  products,
  updatedProduct,
  newProduct,
  internalError,
};