const http = require('http');
const URL = require('url');
const users = require('./users.json');

http.createServer((request, response) => {
  // Responde pro cliente;
  const { name, lastName, age } = URL.parse(request.url, true).query;
  if (name || lastName || age) {
    console.log('query',  name, lastName, age);
  }

  response.end(JSON.stringify(users));
}).listen(3001, () => {
  console.log('API is running on port 3001');
})