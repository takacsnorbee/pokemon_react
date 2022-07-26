import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../common/Button/Button';
import PokemonListCard from '../PokemonListCard/PokemonListCard';
import Loader from '../Loader/Loader';
import SelectBox from '../common/SelectBox/SelectBox';
import Input from '../common/Input/Input';

import './PokemonList.css';

import { fetchPokemonTypesAPI } from '../../store/pokemonTypes/thunk';
import { fetchPokemonsByTypesAPI } from '../../store/pokemons/thunk';
import { getCatchedPokemonsAction } from '../../store/catchedPokemons/action';

const PokemonsList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const pokemons = useSelector((state) => state.pokemons);
	const pokemonTypes = useSelector((state) => state.pokemonTypes);
	const isLoading = useSelector((state) => state.isLoading);
	const catchedPokemons = useSelector((state) => state.catchedPokemons);
	const [showAllPokemon, setShowAllPokemon] = useState(true);
	const [searchPokemonByName, setSearchPokemonByName] = useState('');

	useEffect(() => {
		dispatch(fetchPokemonTypesAPI());
		dispatch(getCatchedPokemonsAction());
	}, []);

	const handleToggleListBtn = () => {
		setShowAllPokemon((prevState) => !prevState);
	};

	const handleInputEvent = (event) => {
		setSearchPokemonByName(event.target.value);
	};

	const handleSelectBox = (event) => {
		dispatch(fetchPokemonsByTypesAPI(event.target.value));
	};

	const handleClickOnPokemonListCard = (pokemonName) => {
		navigate(`/pokemon/${pokemonName}`);
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<main className='pokemon-list-wrapper'>
					<section>
						<h1>Pokemons</h1>
						<SelectBox
							selectBoxClass={'select-pokemon-types'}
							optionsData={pokemonTypes}
							handleEvent={handleSelectBox}
						/>
						<Input
							inputClass={'search-input'}
							handleEvent={handleInputEvent}
							inputPlaceholder={'Search by name'}
							inputType={'text'}
						/>
						<Button
							btnTitle={showAllPokemon ? 'Show catched only' : 'Show all'}
							btnClass={'toggle-list-btn'}
							handleEvent={handleToggleListBtn}
						/>
						<p className={pokemons.length > 0 ? '' : 'hide-result-title'}>
							Result:
						</p>
					</section>
					<section>
						{showAllPokemon
							? pokemons
									.filter((pokemon) => {
										return pokemon.pokemon.name.includes(searchPokemonByName);
									})
									.map((pokemon) => {
										return (
											<PokemonListCard
												pokemonName={pokemon.pokemon.name}
												key={pokemon.pokemon.url}
												pokemonListCardClass='pokemon-list-card'
												optionalClass={
													catchedPokemons.includes(pokemon.pokemon.name)
														? 'catched-pokemon-list-card'
														: ''
												}
												clickOnPokemonListCard={handleClickOnPokemonListCard}
											/>
										);
									})
							: pokemons
									.filter((pokemon) => {
										return catchedPokemons.includes(pokemon.pokemon.name);
									})
									.filter((pokemon) => {
										return pokemon.pokemon.name.includes(searchPokemonByName);
									})
									.map((pokemon) => {
										return (
											<PokemonListCard
												pokemonName={pokemon.pokemon.name}
												key={pokemon.pokemon.url}
												pokemonListCardClass='pokemon-list-card'
												optionalClass={
													catchedPokemons.includes(pokemon.pokemon.name)
														? 'catched-pokemon-list-card'
														: ''
												}
												clickOnPokemonListCard={handleClickOnPokemonListCard}
											/>
										);
									})}
					</section>
				</main>
			)}
		</>
	);
};

export default PokemonsList;
