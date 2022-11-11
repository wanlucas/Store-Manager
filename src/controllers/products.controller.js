const { productsService } = require('../services');

const getAllProducts = async (_req, res) => {
  const { error, output } = await productsService.getAllProducts();

  if (error) return res.status(500).send(error);

  return res.status(200).json(output);
};

const getProduct = async (req, res) => {
  const { id } = req.params;

  const { error, output } = await productsService.getProduct(id);

  if (error) return res.status(500).send(error);

  return res.status(200).json(output);
};

module.exports = {
  getAllProducts,
  getProduct,
};