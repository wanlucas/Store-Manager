const { salesService } = require('../services');

const errorMap = require('../utils/errorMap');

const createSale = async (req, res) => {
  const { error, output } = await salesService.createSale(req.body);

  if (error) {
    const { status, message } = errorMap(error);
    return res.status(status).json({ message });
  }

  return res.status(201).json(output);
};

module.exports = {
  createSale,
};