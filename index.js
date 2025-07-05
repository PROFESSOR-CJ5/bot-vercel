const http = require('http');
const qs = require('querystring');

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Professor Bot</title>
  <style>
    body {
      background: #0d1117;
      color: #c9d1d9;
      font-family: 'Segoe UI', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    h1 {
      color: #39ff14;
    }
    form {
      background: #161b22;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px #39ff14;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    input, select, button {
      padding: 10px;
      border: none;
      border-radius: 4px;
      font-size: 1em;
    }
    button {
      background: #39ff14;
      color: #000;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>Professor Bot</h1>
  <form method="POST">
    <input type="text" name="name" placeholder="Jina lako" required />
    <input type="text" name="message" placeholder="Ujumbe kwa bot" required />
    <button type="submit">Tuma kwa Bot</button>
  </form>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let data = '';
    req.on('data', chunk => (data += chunk));
    req.on('end', () => {
      const parsed = qs.parse(data);
      res.setHeader('Content-Type', 'text/html');
      res.end(`<h2 style="color:lime;">Asante ${parsed.name}, ujumbe wako: "${parsed.message}" umepokelewa!</h2>`);
    });
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
  }
});

server.listen(process.env.PORT || 3000);
