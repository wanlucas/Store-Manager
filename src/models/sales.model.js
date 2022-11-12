const snakeize = require('snakeize');
const connection = require('./connection');

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

module.exports = {
  insert,
};