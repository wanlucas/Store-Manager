const { products } = require('../../mocks/products.mock');

const newProduct = {
  error: null,
  output: { 
    name: 'Corsa azul',
    id: 10,
  },
};

module.exports = {
  products,
  newProduct,
};