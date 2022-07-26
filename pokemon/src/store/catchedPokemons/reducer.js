import {
	ADD_TO_CATCHED,
	REMOVE_FROM_CATCHED,
	GET_CATCHED_POKEMONS,
} from './types';

const initialState = [];

const catchedPokemonsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_CATCHED_POKEMONS:
			return state;
		case ADD_TO_CATCHED:
			return [...state, action.payload];
		case REMOVE_FROM_CATCHED:
			return (state) => {
				state.filter((pokemon) => pokemon !== action.payload);
			};
		default:
			return state;
	}
};

export default catchedPokemonsReducer;
