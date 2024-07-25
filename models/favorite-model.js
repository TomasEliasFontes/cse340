const pool = require("../database/");

async function addFavorite(account_id, inv_id) {
  try {
    const sql = `INSERT INTO favorites (account_id, inv_id) VALUES ($1, $2) RETURNING *`;
    const result = await pool.query(sql, [account_id, inv_id]);
    return result.rows[0];
  } catch (error) {
    return error.message;
  }
}

async function removeFavorite(favorite_id) {
  try {
    const sql = `DELETE FROM favorites WHERE favorite_id = $1`;
    const result = await pool.query(sql, [favorite_id]);
    return result.rowCount;
  } catch (error) {
    return error.message;
  }
}

async function getFavoritesByAccountId(account_id) {
  try {
    const sql = `SELECT * FROM inventory INNER JOIN favorites ON inventory.inv_id = favorites.inv_id WHERE favorites.account_id = $1`;
    const result = await pool.query(sql, [account_id]);
    return result.rows;
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  addFavorite,
  removeFavorite,
  getFavoritesByAccountId
};
