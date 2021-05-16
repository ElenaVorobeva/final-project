import React from 'react';
import { connect } from 'react-redux';
import { loadPokemons, catchPokemon, handleCaughtPokemon } from '../store/pokemons';
import ReactPaginate from 'react-paginate';
import Loading from './common/Loading.jsx';
import IP from '../utils/constatns';
import { handleDispatch, aboutPokemon, handlePokemonImage, handlePokemonImageError } from '../utils/pokemonLinks';

class Pokemons extends React.Component {

  constructor(props) {
    super();
    this.state = {
      currentPage: 0,
      pageSize: 20,
    };
    this.props = props;
  }

  componentDidMount = () => {
    handleDispatch(this.props, loadPokemons(this.state.currentPage, this.state.pageSize));
  }

  handlePageChange = page => {
    const newPage = page.selected + 1;
    const start = (newPage - 1) * this.state.pageSize;
    const end = start + this.state.pageSize;
    this.setState({ currentPage: newPage - 1})

    handleDispatch(this.props, loadPokemons(start, end));
  };

  handleCatchButton = (pokemon) => {
    handleDispatch(this.props, catchPokemon(pokemon))
    handleDispatch(this.props, handleCaughtPokemon(pokemon))
}

  render() {
    const { currentPage, pageSize } = this.state;
    const { pokemons, loading, totalCount } = this.props;

    if (loading) return <Loading />
    if (pokemons.length === 0) return <p className="m-3" aria-label="Message">No pokemons in the database.</p>

    return (
      <React.Fragment>
        <section className='pokemon mt-3' aria-label="Pokemon cards">
        <h1>Pokemons</h1>
          <div className="pokemon__cards mb-5">
            {pokemons.map((pokemon, index) => (
              <div key={index} className="pokemon__card" aria-label={pokemon.name}>
                <div className={pokemon.isCaught ? 'pokemon__inner pokemon__rotate' : 'pokemon__inner'}>
                <div className='pokemon__front' style={{backgroundImage: `url(http://${IP}:9002/images/pokeball1.svg)`}}>
                    <img className="pokemon__image" src={handlePokemonImage(pokemon.id)} alt="Pokemon" onError={handlePokemonImageError}/>
                    <div className="pokemon__top">
                      <p className="pokemon__name">{pokemon.name}</p>
                      <button className='btn btn-danger pokemon__btn pokemon__btn_hover' disabled={pokemon.isCaught} onClick={() => this.handleCatchButton(pokemon)}>Catch</button>
                    </div>
                    <a className="pokemon__link" target="_blank" href={aboutPokemon(pokemon.id)}></a>
                </div>

                  <div className="pokemon__back" style={{backgroundImage: `url(http://${IP}:9002/images/pokeball1.svg)`}}>
                    <img className="pokemon__image" src={handlePokemonImage(pokemon.id)} alt="Pokemon" onError={handlePokemonImageError}/>
                    <div className="pokemon__top">
                      <p className="pokemon__name">{pokemon.name}</p>
                      <button className='btn btn-danger pokemon__btn pokemon__btn_disabled' disabled>Caught</button>
                    </div>
                    <a className="pokemon__link" target="_blank" href={aboutPokemon(pokemon.id)}></a>
                  </div>
                </div>            
              </div>
            ))}
      </div>

      <nav className="mx-auto" aria-label="Navigation">
      <ReactPaginate
        pageCount={Math.ceil(totalCount / pageSize)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        previousLabel={'<'}
        nextLabel={'>'}
        onPageChange={this.handlePageChange}
        forcePage={currentPage}

        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName='pagination'
        pageClassName='page-item'
        previousClassName='page-item'
        nextClassName='page-item'
        pageLinkClassName='page-link'
        previousLinkClassName='page-link'
        nextLinkClassName='page-link'
        activeClassName='active'
        />
      </nav>
      </section>
      </React.Fragment>
      
    )
  }

}

const mapStateToProps = function(state) {
  return {
    pokemons: state.entities.pokemons.list,
    loading: state.entities.pokemons.loading,
    totalCount: state.entities.pokemons.totalCount
  }
}
 
export default connect(mapStateToProps)(Pokemons);