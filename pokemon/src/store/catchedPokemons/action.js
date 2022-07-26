import {
	ADD_TO_CATCHED,
	REMOVE_FROM_CATCHED,
	GET_CATCHED_POKEMONS,
} from './types';

export const addToCatchedAction = (payload) => ({
	type: ADD_TO_CATCHED,
	payload,
});

export const removeFromCatchedAction = (payload) => ({
	type: REMOVE_FROM_CATCHED,
	payload,
});

export const getCatchedPokemonsAction = (payload) => ({
	type: GET_CATCHED_POKEMONS,
	payload,
});
