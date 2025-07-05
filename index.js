require('dotenv').config();
const http = require('http');
const qs = require('querystring');
const fetch = require('node-fetch');

const HF_TOKEN = "Bearer " + process.env.HF_TOKEN;

const html = `
<!DOCTYPE html>
<html lang="sw">
<head>
  <meta charset="UTF-8" />
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
    #chat-box {
      background: #161b22;
      width: 90%;
      max-width: 600px;
      height: 70vh;
      overflow-y: auto;
      padding: 10px;
      border-radius: 10px;
      box-shadow: 0 0 10px #39ff14;
      margin-bottom: 20px;
    }
    .msg {
      margin: 10px 0;
    }
    .user {
      text-align: right;
      color: #39ff14;
    }
    .bot {
      text-align: left;
      color: #58a6ff;
    }
    form {
      display: flex;
      gap: 10px;
      width: 90%;
      max-width: 600px;
    }
    input {
      flex: 1;
      padding: 10px;
      border-radius: 6px;
      border: none;
      font-size: 1em;
    }
    button {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      background: #39ff14;
      color: #000;
      font-weight: bold;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>Professor Bot</h1>
  <div id="chat-box"></div>
  <form id="chat-form">
    <input type="text" id="message" name="message" placeholder="Andika ujumbe..." autocomplete="off" required />
    <button type="submit">Tuma</button>
  </form>

  <script>
    const form = document.getElementById('chat-form');
    const input = document.getElementById('message');
    const chatBox = document.getElementById('chat-box');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const msg = input.value;
      appendMessage('user', msg);
      input.value = '';

      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ message: msg })
      });
      const data = await res.text();
      appendMessage('bot', data);
    });

    function appendMessage(sender, text) {
      const msg = document.createElement('div');
      msg.className = 'msg ' + sender;
      msg.innerHTML = text;
      chatBox.appendChild(msg);
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  </script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let data = '';
    req.on('data', chunk => (data += chunk));
    req.on('end', async () => {
      const parsed = qs.parse(data);
      const userMessage = parsed.message;

      try {
        const response = await fetch("https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium", {
          method: "POST",
          headers: {
            Authorization: HF_TOKEN,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ inputs: userMessage })
        });

        const json = await response.json();
        const botReply = json.generated_text || "Samahani, sikuelewa.";
        res.setHeader('Content-Type', 'text/plain');
        res.end(botReply);
      } catch (err) {
        console.error(err);
        res.setHeader('Content-Type', 'text/plain');
        res.end("Samahani, AI haijajibu kwa sasa.");
      }
    });
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
  }
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Professor Bot running...");
});
