const { productsModel } = require('../models');

const doesProductsExist = async (products) => { 
    const promises = products.map(async (id) => (
      productsModel.findById(id)
    ));

    const result = await Promise.all(promises);

    return result.every((product) => product);
};

const getAllProducts = async () => {
  const products = await productsModel.findAll();

  return { error: null, output: products };
};

const getProduct = async (id) => { 
  const product = await productsModel.findById(id);

  if (!product) return { error: 'PRODUCT_NOT_FOUND' };

  return { error: null, output: product };
};

const createProduct = async (product) => {  
  const newProduct = await productsModel.insert(product);

  return { error: null, output: newProduct };
};

module.exports = {
  doesProductsExist,
  getAllProducts,
  getProduct,
  createProduct,
};