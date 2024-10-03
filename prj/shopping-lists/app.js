import { serve, configure } from "./deps.js";
import * as mainController from "./controllers/mainController.js";
import * as listController from "./controllers/listController.js";
import * as itemController from "./controllers/itemController.js";

/**requirements: 
 * The application is launched using a file called app.js, 
 * which is in the root folder of the application 
 * (folder shopping-lists in the returned zip).
 */

/* configure the path to find the Eta fiels */
configure({
  views: `${Deno.cwd()}/views/`,
});


const handleRequest = async (request) => {
  console.log("Responding with Hello world!");

  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET"){
    return await mainController.getStatistics(request);
  }else if (url.pathname === "/lists" && request.method === "GET") {
    return await listController.viewLists(request);
  }else if (url.pathname === "/lists" && request.method === "POST") {
    return await listController.addList(request);
  } else if (url.pathname.match("/lists/[0-9]+") && request.method === "GET") {
    return await listController.viewList(request);
  } else if (url.pathname.match("/lists/[0-9]+/deactivate") && request.method === "POST") {
    return await listController.deactiveList(request);
  }  else if (url.pathname.match("/lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST") {
    return await itemController.collectItem(request);
  } else if (url.pathname.match("/lists/[0-9]+/items") && request.method === "POST") {
    return await itemController.createItem(request);
  } else {
    return new Response("Hello world, not yet implement page, please go to root '/'");
  }
  // return new Response("Hello world!");
};

serve(handleRequest, { port: 7777 });