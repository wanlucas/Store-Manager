const { salesService } = require('../services');

const errorMap = require('../utils/errorMap');

const getSales = async (_req, res) => { 
  const { error, output } = await salesService.getSales();

  if (error) {
    const { status, message } = errorMap(error);
    return res.status(status).json({ message });
  }

  return res.status(200).json(output);
};

const getSaleById = async (req, res) => { 
  const { id } = req.params;
  const { error, output } = await salesService.getSaleById(id);

  if (error) {
    const { status, message } = errorMap(error);
    return res.status(status).json({ message });
  }

  return res.status(200).json(output);
};

const createSale = async (req, res) => {
  const { error, output } = await salesService.createSale(req.body);

  if (error) {
    const { status, message } = errorMap(error);
    return res.status(status).json({ message });
  }

  return res.status(201).json(output);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { error } = await salesService.deleteSale(id);

  if (error) {
    const { status, message } = errorMap(error);
    return res.status(status).json({ message });
  }

  return res.status(204).end();
};

const updateSale = async (req, res) => { 
  const { id } = req.params;
  const newSale = req.body;

  const { error, output } = await salesService.updateSale(id, newSale);

  if (error) {
    const { status, message } = errorMap(error);
    return res.status(status).json({ message });
  }

  return res.status(200).json(output);
};

module.exports = {
  getSales,
  createSale,
  getSaleById,
  deleteSale,
  updateSale,
};