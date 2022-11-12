const { salesModel } = require('../models');
const { doesProductsExist } = require('./products.service');

const createSale = async (sale) => {
  const ids = sale.map(({ productId }) => productId);

  if (!await doesProductsExist(ids)) {
    return { error: 'PRODUCT_NOT_FOUND' };
  }
    
  try {
    const output = await salesModel.insert(sale);

    return { error: null, output };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  createSale,
};