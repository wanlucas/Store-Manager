const { validateProduct } = require('./validations/validate');

const validateNewProductFields = (req, res, next) => { 
  const { error, status } = validateProduct(req.body);

  if (error) return res.status(status).json({ message: error });

  return next();
};

module.exports = validateNewProductFields;
