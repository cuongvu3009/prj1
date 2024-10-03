/** This file is used for generate response at "/" with main page */
import { renderFile } from "../deps.js";
import * as listService from "../services/listService.js";
import * as itemService from "../services/itemService.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

/** get Statistics from database */
const getStatistics = async ( request ) => {
  const data = {
    lists_num: await listService.getListsNum(),
    items_num: await itemService.getItemNum(),
  }
  return new Response(await renderFile("mainpage.eta", data), responseDetails);
}

export { getStatistics }