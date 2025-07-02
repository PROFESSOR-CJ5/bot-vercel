const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello, bot yako imeanzishwa kwenye Vercel!');
});

server.listen(process.env.PORT || 3000);
