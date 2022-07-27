import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
	const [showResult, setshowResult] = useState(false);

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
		setshowResult(true);
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
						<p className={showResult > 0 ? 'show-result' : 'hide-result'}>
							Result:
						</p>
					</section>
					<section>
						<TransitionGroup>
							{showAllPokemon
								? pokemons
										.filter((pokemon) => {
											return pokemon.pokemon.name.includes(searchPokemonByName);
										})
										.map((pokemon) => {
											return (
												<CSSTransition
													key={pokemon.pokemon.url}
													timeout={700}
													classNames='result'
												>
													<PokemonListCard
														pokemonName={pokemon.pokemon.name}
														key={pokemon.pokemon.url}
														pokemonListCardClass='pokemon-list-card'
														optionalClass={
															catchedPokemons.includes(pokemon.pokemon.name)
																? 'catched-pokemon-list-card'
																: ''
														}
														clickOnPokemonListCard={
															handleClickOnPokemonListCard
														}
													/>
												</CSSTransition>
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
												<CSSTransition
													key={pokemon.pokemon.url}
													timeout={700}
													classNames='result'
												>
													<PokemonListCard
														pokemonName={pokemon.pokemon.name}
														key={pokemon.pokemon.url}
														pokemonListCardClass='pokemon-list-card'
														optionalClass={
															catchedPokemons.includes(pokemon.pokemon.name)
																? 'catched-pokemon-list-card'
																: ''
														}
														clickOnPokemonListCard={
															handleClickOnPokemonListCard
														}
													/>
												</CSSTransition>
											);
										})}
						</TransitionGroup>
					</section>
				</main>
			)}
		</>
	);
};

export default PokemonsList;
