const { validateProduct } = require('./validations/validate');

const validateNewProductFields = (req, res, next) => { 
  const { name } = req.body;
  const error = validateProduct({ name });

  if (error) {
    const status = !name ? 400 : 422;

    return res.status(status).json({ message: error.message });
  }

  return next();
};

module.exports = validateNewProductFields;
