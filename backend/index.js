var jsonServer = require('json-server');
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(router);

server.listen(9002, function () {
  console.log('JSON Server is running on localhost:9002/');
});
