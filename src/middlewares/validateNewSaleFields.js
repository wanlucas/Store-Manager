const { validateSale } = require('./validations/validate');

const validateNewSaleFields = (req, res, next) => {
  const { error, status } = validateSale(req.body);

  if (error) {
    return res.status(status).json({ message: error });
  }

  return next();
};

module.exports = validateNewSaleFields;
