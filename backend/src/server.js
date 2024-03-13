const express = require('express');
const cors = require('cors');
const hostname = '0.0.0.0';
const port = 3000;
const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded());

let score = { home: 0, away: 0 };

setInterval(() => {
  score.home++;
}, 10000);

setInterval(() => {
  score.away++;
}, 30000);

server.get('/score', (req, res) => {
  res.json(score);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});