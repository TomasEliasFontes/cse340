const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
    try {
      const data = await pool.query(
        `SELECT * FROM public.inventory AS i 
        JOIN public.classification AS c 
        ON i.classification_id = c.classification_id 
        WHERE i.classification_id = $1`,
        [classification_id]
      )
      return data.rows
    } catch (error) {
      console.error("getInventoryByClassificationId error " + error)
    }
}

/* ***************************
 *  Get inventory item by inventory_id
 * ************************** */
async function getInventoryById(inventory_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory 
      WHERE inv_id = $1`,
      [inventory_id]
    );
    return data.rows;
  } catch (error) {
    console.error("getInventoryById error " + error);
  }
}

/* ***************************
 *  Add a new classification
 * ************************** */
async function addClassification(classification_name) {
  try {
    const result = await pool.query(
      'INSERT INTO classification (classification_name) VALUES ($1)',
      [classification_name]
    );
    return result.rowCount;
  } catch (err) {
    console.error("addClassification error " + err);
    return null;
  }
}

/* ***************************
 *  Add a new inventory item
 * ************************** */
async function addInventory(inv_make, inv_model, inv_year, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) {
  try {
    const result = await pool.query(
      'INSERT INTO inventory (inv_make, inv_model, inv_year, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [inv_make, inv_model, inv_year, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id]
    );
    return result.rowCount;
  } catch (err) {
    console.error("addInventory error " + err);
    return null;
  }
}

module.exports = { getClassifications, getInventoryByClassificationId, getInventoryById, addClassification, addInventory }