const snakeize = require('snakeize');
const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => { 
  const [result] = await connection.execute(
   `SELECT sl.sale_id, sl.product_id, sl.quantity, s.date
    FROM sales_products as sl
      INNER JOIN sales AS s
        ON s.id = sl.sale_id`,
  );

  return camelize(result);
};

const findById = async (id) => { 
  const [result] = await connection.execute(
   `SELECT sl.product_id, sl.quantity, s.date
    FROM sales_products as sl
      INNER JOIN sales AS s
        ON s.id = sl.sale_id
    WHERE s.id = ?`,
    [id],
  );

  return camelize(result);
};

const insert = async (sale) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales VALUES ()',
  );

  const lines = sale.map((product) => (
    `(${insertId}, ${Object.values(product).join(', ')})`
  )).join(', ');

  const columns = Object.keys(snakeize(sale[0]))
    .map((key) => `${key}`)
    .join(', ');
  
  await connection.execute(
    `INSERT INTO sales_products(sale_id, ${columns}) VALUES ${lines}`,
  );

  return {
    id: insertId,
    itemsSold: sale,
  };
};

const erase = async (id) => { 
  await connection.execute(
    'DELETE FROM sales WHERE id = ?',
    [id],
  );
};

module.exports = {
  findAll,
  findById,
  insert,
  erase,
};