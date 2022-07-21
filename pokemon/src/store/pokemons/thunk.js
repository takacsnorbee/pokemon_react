import { setLoaderAction } from '../loader/actions';
import { fetchPokemons } from './actions';

export const fetchPokemonsByTypesAPI = (pokemonType) => {
	return async function (dispatch) {
		dispatch(setLoaderAction(true));
		const pokemons = await fetch(
			`https://pokeapi.co/api/v2/type/${pokemonType}`
		)
			.then((res) => res.json())
			.catch((error) => console.log(error))
			.finally(dispatch(setLoaderAction(false)));
		dispatch(fetchPokemons(pokemons.pokemon));
	};
};
