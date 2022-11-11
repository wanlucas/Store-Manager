const { productsModel } = require('../models');

const getAllProducts = async () => {
  const products = await productsModel.findAll();

  return { error: null, output: products };
};

const getProduct = async (id) => { 
  const product = await productsModel.findById(id);

  return { error: null, output: product };
};

module.exports = {
  getAllProducts,
  getProduct,
};