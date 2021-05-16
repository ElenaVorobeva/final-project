import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPokemon } from '../store/pokemons';
import Loading from './common/Loading.jsx';

import IP from '../utils/constatns';
import { handleDispatch, handleName, handleAboutImage } from '../utils/pokemonLinks';

const Pokemon = (props) => {
  let { id } = useParams();
  id = Number(id);

  useEffect(() => {
    handleDispatch(props, getPokemon(id))
  }, [])

  const { pokemon, loading } = props;

  {if (loading) return <Loading />}
  {if (!pokemon.id) return <p className="m-3" aria-label="Message">No such pokemon in the database.</p>}

  return (
    <React.Fragment>
      <section className="about my-5" aria-label={pokemon.name}>
      <div className="about__image-bg" style={{backgroundImage: `url(http://${IP}:9002/images/pokeball.svg)`}}></div>
        <div className="about__info mt-5">
          <h1 className="about__title mb-4">{handleName(pokemon)}</h1>
          <p aria-label="ID" className="about__id">ID: {pokemon.id}</p>
          <p aria-label="Status" className="about__status">Status: {pokemon.isCaught ? 'Caught' : 'Free'}</p>
          <p aria-label="Catch time" className="about__time">{pokemon.isCaught ? 'Caught: ' + pokemon.catchTime : ''}</p>
        </div>
        <div className="about__image" aria-label={'Image of ' + pokemon.name}>
          <img src={handleAboutImage(id)} alt={pokemon.name} className="about__photo"/>
        </div>
      </section>
    </React.Fragment>
  );
}
 
const mapStateToProps = function(state) {
  return {
    pokemon: state.entities.pokemons.pokemon,
    loading: state.entities.pokemons.loading
  }
}
 
export default connect(mapStateToProps)(Pokemon);