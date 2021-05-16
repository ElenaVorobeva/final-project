import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';

const slice = createSlice({
  name: 'pokemons',

  initialState: {
    list: [],
    caught: [],
    pokemon: [],
    totalCount: 0,
    totalCountCaught: 0,
    loading: false,
    lastFetch: null,
    catchPokemonLoading: false,
    handleCatchingPokemon: false,
  },

  reducers: {
    pokemonsRequested: pokemons => {
      pokemons.loading = true;
    },

    pokemonsRecieved: (pokemons, action) => {
      const index = pokemons.list.findIndex(
        pokemon => pokemon.id === action.payload.id
      );

      pokemons.list = action.payload;
      pokemons.loading = false;
      pokemons.lastFetch = Date.now();
      pokemons.totalCount = action.headers['x-total-count'];
    },

    pokemonsRequestFailed: pokemons => {
      pokemons.loading = false;
    },

    caughtPokemonsRequested: pokemons => {
      pokemons.loading = true;
    },

    caughtPokemonsRecieved: (pokemons, action) => {
      pokemons.caught = action.payload;
      pokemons.loading = false;
      pokemons.totalCountCaught = action.headers['x-total-count'];
    },

    caughtPokemonsRequestFailed: pokemons => {
      pokemons.loading = false;
    },

    catchPokemonRequested: pokemons => {
      pokemons.catchPokemonLoading = true;
    },

    pokemonCaught: (pokemons, action) => {
      pokemons.catchPokemonLoading = false;
      const index = pokemons.list.findIndex(
        pokemon => pokemon.id === action.payload.id
      );

      pokemons.list[index] = action.payload;
    },

    catchPokemonFailed: pokemons => {
      pokemons.catchPokemonLoading = false;
    },

    handleCaughtPokemonRequested: pokemons => {
      pokemons.handleCatchingPokemon = true;
    },

    caughtPokemonHandled: (pokemons, action) => {
      pokemons.handleCatchingPokemon = false;
      pokemons.caught.push(action.payload);
    },

    handleCaughtPokemonFailed: pokemons => {
      pokemons.catchPokemonLoading = false;
    },

    getPokemonRequested: pokemons => {
      pokemons.loading = true;
    },

    getPokemonRecieved: (pokemons, action) => {
      pokemons.loading = false;

      pokemons.pokemon = action.payload;
    },

    getPokemonFailed: pokemons => {
      pokemons.loading = false;
    },
  },
});

const {
  pokemonsRecieved,
  pokemonsRequested,
  pokemonsRequestFailed,
  caughtPokemonsRequested,
  caughtPokemonsRecieved,
  caughtPokemonsRequestFailed,
  catchPokemonRequested,
  pokemonCaught,
  catchPokemonFailed,
  handleCaughtPokemonRequested,
  caughtPokemonHandled,
  handleCaughtPokemonFailed,
  getPokemonRequested,
  getPokemonRecieved,
  getPokemonFailed,
} = slice.actions;
export default slice.reducer;

const url = '/pokemons';
const caughtPokemonsUrl = '/caughtpokemons';

export const loadPokemons = (start, end) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: url + `?_start=${start}&_end=${end}`,
      onStart: pokemonsRequested.type,
      onSuccess: pokemonsRecieved.type,
      onError: pokemonsRequestFailed.type,
    })
  );
};

export const loadCaughtPokemons = (start, end) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: caughtPokemonsUrl + `?_start=${start}&_end=${end}`,
      onStart: caughtPokemonsRequested.type,
      onSuccess: caughtPokemonsRecieved.type,
      onError: caughtPokemonsRequestFailed.type,
    })
  );
};

export const handleCaughtPokemon = pokemon => dispatch => {
  dispatch(
    apiCallBegan({
      url: caughtPokemonsUrl,
      method: 'post',
      data: pokemon,
      onStart: handleCaughtPokemonRequested.type,
      onSuccess: caughtPokemonHandled.type,
      onError: handleCaughtPokemonFailed.type,
    })
  );
};

export const catchPokemon = pokemon => dispatch => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  dispatch(
    apiCallBegan({
      url: url + '/' + pokemon.id,
      method: 'patch',
      data: {
        isCaught: true,
        catchTime: new Date(Date.now()).toLocaleString('en-US', options),
      },
      onStart: catchPokemonRequested.type,
      onSuccess: pokemonCaught.type,
      onError: catchPokemonFailed.type,
    })
  );
};

export const getPokemon = id => dispatch => {
  dispatch(
    apiCallBegan({
      url: url + `/${id}`,
      onStart: getPokemonRequested.type,
      onSuccess: getPokemonRecieved.type,
      onError: getPokemonFailed.type,
    })
  );
};
