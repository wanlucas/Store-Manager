const { productSchema, saleSchema } = require('./schemas');

const formatError = (error) => ({
    error: error.message,
    status: error.details[0].type.endsWith('required') ? 400 : 422,
});

const validateProduct = (product) => { 
  const { error } = productSchema.validate(product);

  if (error) return formatError(error);

  return { error: null };
};

const validateSale = (sale) => { 
  for (let i = 0; i < sale.length; i += 1) {
    const { error } = saleSchema.validate(sale[i]);

    if (error) return formatError(error);
  }

  return { error: null };
};

module.exports = {
  validateProduct,
  validateSale,
};