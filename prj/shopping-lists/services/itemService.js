/** operating the shopping_list_items database, built open ../database/database.js */

import { executeQuery } from "../database/database.js";

/** Create an item */
const createItem = async ( shopping_list_id, name ) => {
  console.log("Enter createItem");
  console.log("name: ");
  console.log(name);
  await executeQuery(
    "INSERT INTO shopping_list_items (shopping_list_id, name ) VALUES ($shopping_list_id, $name);", {
      shopping_list_id,
      name,
    }
  );
}

/** show uncollected Item by List id */
const getItemByListId = async ( shopping_list_id ) => {
  let result = await executeQuery("SELECT * FROM shopping_list_items WHERE shopping_list_id=$shopping_list_id AND NOT collected  ORDER BY name;", {
    shopping_list_id,
  });
  return result.rows;
}

/** show collected Item by List id */
const getCollectedItemByListId = async ( shopping_list_id ) => {
  let result = await executeQuery("SELECT * FROM shopping_list_items WHERE  shopping_list_id=$shopping_list_id AND collected  ORDER BY name;", {
    shopping_list_id,
  });
  return result.rows;
}

/** show total number by List id */
const getItemNum = async () => {
  let result = await executeQuery("SELECT COUNT(id) FROM shopping_list_items;");
  return result.rows[0].count;
}

/** collect Item by item id */
const collectItemById = async ( item_id ) => {
  await executeQuery("UPDATE shopping_list_items set collected=TRUE WHERE id=$item_id;", {
    item_id,
  });
}

/**  */
export { createItem, getItemByListId, getCollectedItemByListId, getItemNum, collectItemById };
