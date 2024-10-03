import { Pool } from "https://deno.land/x/postgres@v0.16.1/mod.ts";

const CONCURRENT_CONNECTIONS = 2;
let connectionPool;

const DATABASE_URL =
  Deno.env.get("DATABASE_URL") ||
  "postgresql://shopping_lists_user:E73NXH5h7npUWQxXqbE4VDfmuyyc7lB0@dpg-crve8368ii6s73e79peg-a.frankfurt-postgres.render.com/shopping_lists";

if (DATABASE_URL) {
  connectionPool = new Pool(DATABASE_URL, CONCURRENT_CONNECTIONS);
} else {
  connectionPool = new Pool({}, CONCURRENT_CONNECTIONS);
}

const executeQuery = async (query, params) => {
  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    const result = await client.queryObject(query, params);
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    console.log(e);
    response.error = e;
  } finally {
    if (client) {
      try {
        await client.release();
      } catch (e) {
        console.log("Unable to release database connection.");
        console.log(e);
      }
    }
  }

  return response;
};

export { executeQuery };
