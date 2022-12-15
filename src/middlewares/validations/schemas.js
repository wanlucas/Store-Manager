const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const saleSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});

module.exports = {
  productSchema,
  saleSchema,
};