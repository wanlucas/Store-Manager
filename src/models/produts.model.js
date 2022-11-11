const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );

  return result;
};

const findById = async () => { 
  const [result] = await connection.execute(
    'SELECT * FROM products WHERE id = 1',
  );

  return result;
};

module.exports = {
  findAll,
  findById,
};