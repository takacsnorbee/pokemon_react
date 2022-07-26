import { pokemonReducer } from './pokemons/reducer';
import { pokemonTypeReducer } from './pokemonTypes/reducer';
import { combineReducers } from 'redux';
import { loaderReducer } from './loader/recuder';
import catchedPokemonsReducer from './catchedPokemons/reducer';

const rootReducer = combineReducers({
	pokemons: pokemonReducer,
	pokemonTypes: pokemonTypeReducer,
	isLoading: loaderReducer,
	catchedPokemons: catchedPokemonsReducer,
});

export default rootReducer;
