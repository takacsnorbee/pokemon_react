import { pokemonReducer } from './pokemons/reducer';
import { pokemonTypeReducer } from './pokemonTypes/reducer';
import { combineReducers } from 'redux';
import { loaderReducer } from './loader/recuder';

const rootReducer = combineReducers({
	pokemons: pokemonReducer,
	pokemonTypes: pokemonTypeReducer,
	isLoading: loaderReducer,
});

export default rootReducer;
