import React from 'react';
import { connect } from 'react-redux';
import { loadCaughtPokemons } from '../store/pokemons';
import ReactPaginate from 'react-paginate';
import Loading from './common/Loading.jsx';
import IP from '../utils/constatns';
import { handleDispatch, aboutPokemon, handlePokemonImage, handlePokemonImageError } from '../utils/pokemonLinks';



class CaughtPokemons extends React.Component {

  constructor(props) {
    super();
    this.state = {
      currentPage: 0,
      pageSize: 20
    };
    this.props = props;
  }

  componentDidMount() {
    handleDispatch(this.props, loadCaughtPokemons(this.state.currentPage, this.state.pageSize));
  }

  handlePageChange = page => {
    const newPage = page.selected + 1;
    const start = (newPage - 1) * this.state.pageSize;
    const end = start + this.state.pageSize;
    this.setState({ currentPage: newPage - 1})

    handleDispatch(this.props, loadCaughtPokemons(start, end));
  }

  render() {
    const { pageSize, currentPage } = this.state;
    const { pokemons, loading, totalCount } = this.props;

    if (loading) return <Loading />
    if (totalCount.length === 0 || pokemons.length === 0) return <p className="m-3" aria-label="Message">You have no caught pokemons.</p>

    const pagesCount = Math.ceil(totalCount / pageSize);

    return (
      <React.Fragment>
      <section className="pokemon mt-3" aria-label="Caught Pokemons">
      <h1>Caught Pokemons</h1>
      <div className="pokemon__cards mb-4">
        {pokemons.map((pokemon, index) => (
        <div key={index} className="pokemon__card" aria-label={pokemon.name}>
          <div className='pokemon__front' style={{backgroundImage: `url(http://${IP}:9002/images/pokeball1.svg)`}}>
            <img className="pokemon__image" src={handlePokemonImage(pokemon.id)} alt="Pokemon" onError={handlePokemonImageError}/>
              <div className="pokemon__top">
                <p className="pokemon__name">{pokemon.name}</p>
                <button className='btn btn-danger pokemon__btn pokemon__btn_disabled' disabled>Caught</button>
              </div>
              <a className="pokemon__link" target="_blank" href={aboutPokemon(pokemon.id)}></a>
          </div>
        </div>
      ))}
      </div>


      {totalCount > pageSize ?
      <nav className="mx-auto">
      <ReactPaginate
        pageCount={pagesCount}
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
      </nav> : ''}

      </section>
      </React.Fragment>
     );
  }

}

const mapStateToProps = function(state) {
  return {
    pokemons: state.entities.pokemons.caught,
    loading: state.entities.pokemons.loading,
    totalCount: state.entities.pokemons.totalCountCaught
  }
}
 
export default connect(mapStateToProps)(CaughtPokemons);