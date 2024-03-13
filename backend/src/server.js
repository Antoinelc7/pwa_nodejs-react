const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/score', (req, res) => {
  const score = '2 - 1';
  res.json({ score });
});

app.post('/score', (req, res) => {
  const newScore = req.body.score;
  res.json({ score: newScore });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error with score server');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));