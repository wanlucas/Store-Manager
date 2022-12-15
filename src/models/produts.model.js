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

const query = async (q) => { 
  const [result] = await connection.execute(
    `SELECT * FROM products WHERE name LIKE '${q}%'`,
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

const update = async (id, newProduct) => { 
  const { name } = newProduct;

  const [{ insertId }] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );

  return {
    ...newProduct,
    id: insertId,
  };
};

const erase = async (id) => { 
  await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );
};

module.exports = {
  findAll,
  findById,
  query,
  insert,
  update,
  erase,
};