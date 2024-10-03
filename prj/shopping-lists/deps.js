/**requirements: 
 * Dependencies are defined in a file called deps.js, 
 * which exports them into use of the project.
 */
export { serve } from "https://deno.land/std@0.171.0/http/server.ts";
export { configure, renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
export { Pool }; 