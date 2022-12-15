const { productsModel } = require('../models');

const doesProductsExist = async (products) => { 
  try {
    if (typeof products === 'string') {
      return productsModel.findById(products);
    }
 
    const promises = products.map(async ({ productId }) => (
      productsModel.findById(productId)
    ));

    const result = await Promise.all(promises);

    return result.every((product) => product);
  } catch (error) {
    return { error: error.message };
  }
};

const getAllProducts = async () => {
  try {
    const products = await productsModel.findAll();

    return { error: null, output: products };
  } catch (error) {
    return { error: error.message };
  }
};

const getProduct = async (id) => { 
  try {
    const product = await productsModel.findById(id);

    if (!product) return { error: 'PRODUCT_NOT_FOUND' };

    return { error: null, output: product };
  } catch (error) {
    return { error: error.message };
  }
};

const searchProducts = async (q) => {
  try {
    const products = await productsModel.query(q);

    return { error: null, output: products };
  } catch (error) {
    return { error: error.message };
  }
};

const createProduct = async (product) => {  
  try {
    const newProduct = await productsModel.insert(product);

    return { error: null, output: newProduct };
  } catch (error) {
    return { error: error.message };
  }
};

const updateProduct = async (id, newProduct) => {
  try {
    if (!await doesProductsExist(id)) {
      return { error: 'PRODUCT_NOT_FOUND' };
    }

    const product = await productsModel.update(id, newProduct);

    return { error: null, output: product };
  } catch (error) {
    return { error: error.message };
  }
};

const deleteProduct = async (id) => { 
  try {
    if (!await doesProductsExist(id)) {
      return { error: 'PRODUCT_NOT_FOUND' };
    }

    await productsModel.erase(id);

    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  doesProductsExist,
  getAllProducts,
  getProduct,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};