# Project 1: Shared shopping list

 > Write the documentation of your project here. Do not include your personal details (e.g. name or student number).

> Remember to include the address of the online location where your project is running as it is a key part of the submission.

## basic requirement
* project name: shared shopping list
* brief description: this is a web application allowing users to `POST`  and `GET` get shopping list and shopping item. There are no `DELETE` method implemented, but use `collect Marks` to strike bought shopping items and `deactivate` function to hide finished shopping lists. The app also support shopping list statistic information. The application itself is a homework from aalto websoftware development course (2023 spring) and one can look it up [here](https://fitech101.aalto.fi/web-software-development/20-course-project-i/1-project-handout/). 
* online deployment: [TODO]
* guideling for running: to start the shopping list, open the terminal in the folder that contains the `docker-compose.yml` and simply type `docker-compose up`. you can end the application by press `ctrl+C`. The webapp can be accessed through http://localhost:7777 if it is running locally.

## about database:
the database is deployed via flyway in docker images, so once you start up the application via `docker-compose up`, you can start an terminal and get into the database with cmd: 
```docker exec -it database-p1-0766a063-3082-43e7-ba77-9710e9e582ce  psql -U username database```
(more config see file `project.env`). Accessing the database require psql sentences, like `\dt` to show tables. remmember to add `;` after each query sentences

## about the function:
this webapp allows the following:
1. adding and listing shopping lists (on route /lists)
2. links for showing a single shopping list
3. adding and listing items for a single shopping list (on route /lists/[0-9]+)
4.  marking items in the shopping list as collected
5.  deactivating shopping lists 


## about the test.
you can run the companion playwrigth automated test programme via command 
```docker-compose run --entrypoint=npx e2e-playwright playwright test``` in the root dir to test all the functionality metioned above.
the tests contains:
1. test1: main page responds test: title "Shared shopping lists";
2. test2: main page responds test: links to /lists;
3. test3: /lists page responds test: links to main page "/";
4. test4: creating a shopping list;
5. test5: to shopping list link;
6. test6: shopping list deactivate;
7. test 7: shopping list page title: list name;
8. test 8: shopping list link back to /lists;
9. test 9: add and view item;
10. test 10: delete item;

required 5 tests but I finished with 10 tests, nearly all the functionality.

## online deployment
implemennt via fly.io, 
name: `silent-dew-966` 
address: [https://silent-dew-967.fly.dev/]
If you leave the application idle for some time,
the online application would response with Internal Service Error,
this is due to the auto_stop_mathines, stopp the machine when idling,
you can always solve this problem by refreshing the page.

the name of the database: `silent-dew-967-db`
Username:    postgres
  Password:    ()
  Hostname:    silent-dew-967-db.internal
  Flycast:     fdaa:2:78a6:0:1::5
  Proxy port:  5432
  Postgres port:  5433
  Connection string: postgres://postgres:inXbGWkquWgkjBi@silent-dew-967-db.flycast:5432
  DATABASE_URL=postgres://silent_dew_967:lRZlC17sYmQYrPm@silent-dew-967-db.flycast:5432/silent_dew_96

you can access the database with the command: `flyctl postgres connect -a silent-dew-967-db -d silent_dew_967`
