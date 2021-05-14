import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home.jsx';
import CaughtPokemons from './CaughtPokemons.jsx';
import NavBar from './common/navbar.jsx';
import Pokemon from './pokemon.jsx';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route path="/pokemons/:id" component={Pokemon}></Route>
        <Route path="/pokemons" component={Home}></Route>
        <Route path="/caught-pokemons" component={CaughtPokemons}></Route>
        <Redirect from="/" exact to="/pokemons"></Redirect>
      </Switch>
    </React.Fragment>
  );
}

export default App;
