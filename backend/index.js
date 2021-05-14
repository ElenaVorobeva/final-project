const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const pokemons = require('./db.json');
const caughtPokemons = require('./caught.json');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/pokemons', (req, res) => {
  res.json(pokemons);
});

app.get('/api/caughtPokemons', (req, res) => {
  res.json(caughtPokemons);
});

app.post('/api/caughtPokemons', (req, res) => {
  const pokemon = { ...req.body };
  caughtPokemons.push(pokemon);

  res.json(caughtPokemons);
});

app.patch('/api/pokemons/:id', (req, res) => {
  const index = pokemons.findIndex(
    pokemon => pokemon.id === parseInt(req.params.id)
  );
  const pokemon = pokemons[index];
  if ('isCaught' in req.body) pokemon.isCaught = req.body.isCaught;
  if ('catchTime' in req.body) pokemon.catchTime = req.body.catchTime;

  res.json(pokemon);
});

app.listen(9002, () => {
  console.log('Node server started on port 9002.');
});
