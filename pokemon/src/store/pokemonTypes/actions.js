import { FETCH_POKEMON_TYPES } from './types';

export const fetchPokemonTypes = (payload) => ({
	type: FETCH_POKEMON_TYPES,
	payload,
});
