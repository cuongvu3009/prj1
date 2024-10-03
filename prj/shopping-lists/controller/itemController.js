import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";

/** Answer request to /lists/{id}/items */
const createItem = async ( request ) => {
  console.log("enter create item ");
  // Get Id 
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  let id = urlParts[2];

  // Get items name 
  const formData = await request.formData();
  const name = formData.get("name");

  console.log("id: ");
  console.log(id);
  console.log("name: ");
  console.log(name);

  await itemService.createItem(id, name);

  return requestUtils.redirectTo(`/lists/${id}`);
};

/** Answer request to /lists/{id}/items/{item_id} */
const collectItem = async ( request ) => {
  // Get list id and item id
  console.log("enter collect item ");
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  let list_id = urlParts[2];
  let item_id = urlParts[4];

  console.log("list_id: ");
  console.log(list_id);
  console.log("item_id: ");
  console.log(item_id);

  await itemService.collectItemById(item_id);
  return requestUtils.redirectTo(`/lists/${list_id}`);
};

export { createItem, collectItem }