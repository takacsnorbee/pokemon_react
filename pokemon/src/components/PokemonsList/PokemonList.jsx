import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../common/Button/Button';
import PokemonListCard from '../PokemonListCard/PokemonListCard';
import Loader from '../Loader/Loader';
import SelectBox from '../common/SelectBox/SelectBox';
import Input from '../common/Input/Input';

import { fetchPokemonTypesAPI } from '../../store/pokemonTypes/thunk';

const PokemonsList = () => {
	const dispatch = useDispatch();
	const pokemonTypes = useSelector((state) => state.pokemonTypes);
	const isLoading = useSelector((state) => state.isLoading);
	const [showAllPokemon, setShowAllPokemon] = useState(false);

	useEffect(() => {
		dispatch(fetchPokemonTypesAPI());
	}, []);

	const handleToggleListBtn = () => {
		setShowAllPokemon((prevState) => !prevState);
	};

	const handleInputEvent = (event) => {
		console.log(event.target.value);
	};

	const handleSelectBox = (event) => {
		console.log(event.target.value);
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<main className='pokemon-list-wrapper'>
					<h1>Pokemons</h1>
					<SelectBox
						selectBoxClass={'select-pokemon-types'}
						optionsData={pokemonTypes}
						handleEvent={handleSelectBox}
					/>
					<Input
						inputClass={'searchInput'}
						handleEvent={handleInputEvent}
						inputPlaceholder={'Search by name'}
						inputType={'text'}
					/>
					<Button
						btnTitle={showAllPokemon ? 'Show catched only' : 'Show all'}
						btnClass={'toggleListBtn'}
						handleEvent={handleToggleListBtn}
					/>
					<p>Result:</p>
					<section>
						<PokemonListCard />
					</section>
				</main>
			)}
		</>
	);
};

export default PokemonsList;
