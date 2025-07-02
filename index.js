const http = require('http');

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Professor Bot</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', sans-serif;
      background: #0d1117;
      color: #c9d1d9;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      flex-direction: column;
    }
    h1 {
      color: #58a6ff;
      font-size: 2em;
      margin-bottom: 10px;
    }
    p {
      color: #8b949e;
      font-size: 1em;
      margin-bottom: 30px;
    }
    .box {
      background: #161b22;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    }
    input, select, button {
      width: 100%;
      padding: 12px;
      margin-top: 10px;
      border: none;
      border-radius: 5px;
      font-size: 1em;
    }
    input, select {
      background: #0d1117;
      color: #c9d1d9;
      border: 1px solid #30363d;
    }
    button {
      background-color: #238636;
      color: white;
      cursor: pointer;
      transition: 0.3s ease;
    }
    button:hover {
      background-color: #2ea043;
    }
  </style>
</head>
<body>
  <div class="box">
    <h1>🚀 Professor Bot Panel</h1>
    <p>Chagua chaguo na tuma request</p>
    <form>
      <select>
        <option>🔓 Permanent Unban</option>
        <option>🔄 Temporary Unban</option>
      </select>
      <input type="text" placeholder="Weka namba yako hapa" />
      <select>
        <option>Prompt 1: Standard</option>
        <option>Prompt 2: Appeal Message</option>
      </select>
      <button type="submit">📩 Tuma Request</button>
    </form>
  </div>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.end(html);
});

server.listen(process.env.PORT || 3000);
