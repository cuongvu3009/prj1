# Shopping List

A web application that is used as a shared shopping list.

# Online Demo

## Contents

The Shopping List has a Deno application that starts on port `7777`.
The application responds to queries with the message `Hello world!`. Launching
the Shopping List starts the Deno application, a PostgreSQL server, and a
database deployed on render

## Starting and shutting down

The Shopping List is used with Docker Compose.

- To start the Shopping List, open up the terminal in the folder that
  contains the `docker-compose.yml` file and type `docker-compose up`.
- To stop the Shopping List, press `ctrl+C` (or similar) in the same terminal
  where you wrote the command `docker-compose up`. Another option is to open up
  a new terminal and navigate to the folder that contains the
  `docker-compose.yml` file, and then write `docker-compose stop`.

## Database

When the Shopping List is up and running, you can access the PostgreSQL
database from the Database management GUI for example: SQLelection or DBeaver with this URL:

postgresql://shopping_lists_user:E73NXH5h7npUWQxXqbE4VDfmuyyc7lB0@dpg-crve8368ii6s73e79peg-a.frankfurt-postgres.render.com/shopping_lists

## Deno cache

When we launch a Deno application, Deno loads any dependencies that the
application uses. These dependencies are then stored to the local file system
for future use. The Shopping List uses the `app-cache`-folder for storing the
dependencies. If you need to clear the cache, empty the contents of the folder.
