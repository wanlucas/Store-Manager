const { productsService } = require('../services');

const errorMap = require('../utils/errorMap');

const getAllProducts = async (_req, res) => {
  const { error, output } = await productsService.getAllProducts();

  if (error) {
    const { status, message } = errorMap(error);
    return res.status(status).json({ message });
  }

  return res.status(200).json(output);
};

const getProduct = async (req, res) => {
  const { id } = req.params;

  const { error, output } = await productsService.getProduct(id);

  if (error) {
    const { status, message } = errorMap(error);
    return res.status(status).json({ message });
  }

  return res.status(200).json(output);
};

const createProduct = async (req, res) => { 
  const { name } = req.body;

  const { error, output } = await productsService.createProduct({ name });

  if (error) {
    const { status, message } = errorMap(error);
    return res.status(status).json({ message });
  }

  return res.status(201).json(output);
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
};