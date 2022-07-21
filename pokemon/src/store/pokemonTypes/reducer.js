import { FETCH_POKEMON_TYPES } from './types';

const initialState = [];

export const pokemonTypeReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_POKEMON_TYPES:
			return action.payload;
		default:
			return state;
	}
};
