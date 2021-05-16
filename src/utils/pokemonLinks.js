import IP from './constatns';

export const aboutPokemon = id => `http://${IP}:3000/pokemons/${id}`;

export const handleDispatch = (element, list) => element.dispatch(list);

export const handlePokemonImage = id => {
  return `http://${IP}:9002/images/${id}.png`;
};

export const handlePokemonImageError = e => {
  e.target.src = `http://${IP}:9002/images/QM.svg`;
};

export const handleName = pokemon => {
  const name = pokemon.name.split('');
  name.splice(0, 1, name[0].toUpperCase());

  return name.join('');
};

export const handleAboutImage = id => {
  const xhr = new XMLHttpRequest();
  xhr.open('HEAD', `http://${IP}:9002/images/${id}.png`, true);
  xhr.send();

  if (xhr.status == '404') {
    return `http://${IP}:9002/images/QM.svg`;
  } else {
    return `http://${IP}:9002/images/${id}.png`;
  }
};
