const { salesModel } = require('../models');
const productsService = require('./products.service');

const getSales = async () => {
  try {
    const sales = await salesModel.findAll();

    return { error: null, output: sales };
  } catch (error) {
    return { error: error.message };
  }
};

const getSaleById = async (id) => {
  try {
    const sale = await salesModel.findById(id);

    if (!sale.length) return { error: 'SALE_NOT_FOUND' };

    return { error: null, output: sale };
  } catch (error) {
    return { error: error.message };
  }
 };

const createSale = async (sale) => {
  try {
    const ids = sale.map(({ productId }) => productId);

    if (!await productsService.doesProductsExist(ids)) {
      return { error: 'PRODUCT_NOT_FOUND' };
    }

    const output = await salesModel.insert(sale);

    return { error: null, output };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  getSales,
  getSaleById,
  createSale,
};