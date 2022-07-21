import { fetchPokemonTypes } from './actions';
import { setLoaderAction } from '../loader/actions';

export const fetchPokemonTypesAPI = () => {
	return async function (dispatch) {
		dispatch(setLoaderAction(true));
		const pokemonTypes = await fetch('https://pokeapi.co/api/v2/type')
			.then((res) => res.json())
			.catch((error) => console.log(error))
			.finally(dispatch(setLoaderAction(false)));
		dispatch(fetchPokemonTypes(pokemonTypes.results));
	};
};
