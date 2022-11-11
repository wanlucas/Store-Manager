const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );

  return result;
};

const findById = async (id) => { 
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );

  return result;
};

const insert = async (product) => { 
  const { name } = product;

  const [{ insertId }] = await connection.execute(
    'INSERT INTO products(name) VALUES(?)',
    [name],
  );

  return { name, id: insertId };
};

module.exports = {
  findAll,
  findById,
  insert,
};