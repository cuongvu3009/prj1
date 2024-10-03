/** operating the shopping_list database, built open ../database/database.js */

import { executeQuery } from "../database/database.js";

/** Create a list  */
const createList = async ( name ) => {
  await executeQuery("INSERT INTO shopping_lists ( name ) VALUES ($name);", {
    name,
  });
}

/** Show active lists */
const getAllActvLists = async() => {
  let result = await executeQuery("SELECT * FROM shopping_lists WHERE active;");
  console.log(result);
  return result.rows;
}
/** get total number of lists  */
const getListsNum = async () => {
  let result = await executeQuery("SELECT COUNT(id) FROM shopping_lists;");
  console.log(result.rows[0]);
  return result.rows[0].count;
}

/** Select the list by id */
const getById = async ( id ) => {
  let result = await executeQuery("SELECT * FROM shopping_lists WHERE id=$id;", {
    id,
  });

  if (result.rows && result.rows.length > 0) {
      return result.rows[0];
  }
    
  return { id: 0, name: "List Does NOT Exists!" };
}
/** Deactive the list by id */
const deactiveById = async ( id ) => {
  // console.log("enter services") more ' than need.
  await executeQuery("UPDATE shopping_lists SET active=FALSE WHERE id=$id;", {
    id,
  });
}
export { createList, getAllActvLists, getListsNum, getById, deactiveById };