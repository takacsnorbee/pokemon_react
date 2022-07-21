import { FETCH_POKEMONS } from './types';

const initialState = [];

export const pokemonReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_POKEMONS:
			return action.payload;
		default:
			return state;
	}
};
