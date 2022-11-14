const { salesModel } = require('../models');
const productsService = require('./products.service');

const doesSaleExist = async (id) => {
  try {
    const [result] = await salesModel.findById(id);

    return result !== undefined;
  } catch (error) {
    return { error: error.message };
  }
};

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
    if (!await productsService.doesProductsExist(sale)) {
      return { error: 'PRODUCT_NOT_FOUND' };
    }

    const output = await salesModel.insert(sale);

    return { error: null, output };
  } catch (error) {
    return { error: error.message };
  }
};

const updateSale = async (id, newSale) => {
  try {
    if (!await doesSaleExist(id)) {
      return { error: 'SALE_NOT_FOUND' };
    }

    if (!await productsService.doesProductsExist(newSale)) {
      return { error: 'PRODUCT_NOT_FOUND' };
    }

    const result = await salesModel.update(id, newSale);

    return { error: null, output: result };
  } catch (error) {
    return { error: error.message };
  }
};

const deleteSale = async (id) => { 
  try {
    if (!await doesSaleExist(id)) {
      return { error: 'SALE_NOT_FOUND' };
    }

    await salesModel.erase(id);

    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  doesSaleExist,
  getSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
};