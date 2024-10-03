/** This file is used for generate proper response at "/lists"and "/lists/{id}" with list info */
import { renderFile } from "../deps.js";
import * as listService from "../services/listService.js";
import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8"},
};

/** Answer request POST /lists */
const addList = async ( request ) => {
  //Get the data sent 
  const formData = await request.formData();
  const name = formData.get("name");

  // create List
  await listService.createList(name);

  // POST/redirect/GET-pattern 
  return requestUtils.redirectTo("/lists");
};

/** Answer request GET /lists */
const viewLists = async ( request ) => {
  // Get all active lists
  const data = {
    lists: await listService.getAllActvLists(),
  };

  return new Response(await renderFile("lists.eta", data), responseDetails);
};

/** Answer request GET /list/:id */
const viewList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  let id = urlParts[2]
  const data = {
      list : await listService.getById(id),
      items : await itemService.getItemByListId(id),
      items_collected : await itemService.getCollectedItemByListId(id)
  }

  console.log(data.items);
  console.log(data.list)

  return new Response(await renderFile("list.eta", data), responseDetails);
}

/** Answer request POST / */
const deactiveList = async ( request ) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  let id = urlParts[2];

  // console.log(id);
  await listService.deactiveById(id);

  return requestUtils.redirectTo("/lists");
};

export { addList, viewLists, viewList, deactiveList } 