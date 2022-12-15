const errorList = {
  PRODUCT_NOT_FOUND: [404, 'Product not found'],
  SALE_NOT_FOUND: [404, 'Sale not found'],
};

const DEFAULT_ERROR = [500, 'Something went wrong'];

const mapError = (type) => {
  const [status, message] = errorList[type] || DEFAULT_ERROR;
  return { status, message };
};

module.exports = mapError;