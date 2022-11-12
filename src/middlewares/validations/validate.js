const { productSchema } = require('./schemas');

const validateProduct = (product) => { 
  const { error } = productSchema.validate(product);

  if (error) return error;

  return null;
};

module.exports = {
  validateProduct,
};