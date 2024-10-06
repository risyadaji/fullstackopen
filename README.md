# fullstackopen
---
Learn fullstack development from https://fullstackopen.com/

# TIL
## Part 1

init vite project:
```
npm create vite@latest <folderName> -- --template <templateName>
```
[details](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)

## Part 2

1. use [json-server](https://www.npmjs.com/package/json-server) as mock server (create `.json` file for mock data)
2. use axios to fetch data from ***server*** 
3. separate components

## Part 3

1. learn express js
2. setup mongodb for database
3. setup deployment using [fly.io](https://fly.io/) 
4. lil update in part2, integrate from FE to BE to Database
5. create deployment flow: 
   1. build FE and built folder `dist` from FE to BE
   2. use built `dist` from FE in BE using express as static page
   3. deploy to [fly.io](https://fly.io/) 
6. refactor into more structured folder:
   1. root (app.js, index.js, package.json, package-lock.json)
   2. controllers (for endpoint routes)
   3. model (data format)
   4. utils (config.js, middleware.js, logger.js, and etc)

## Part 4
1. Unit test using `node:test`
2. We can use `express-async-errors` to handle async error in express
3. We can use `supertest` to test express endpoint
4. We can utilize validation on Schema to validate input 


