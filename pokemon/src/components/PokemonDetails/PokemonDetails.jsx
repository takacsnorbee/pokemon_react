import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../common/Button/Button';
import Loader from '../Loader/Loader';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import './PokemonDetails.css';

import {
	addToCatchedAction,
	removeFromCatchedAction,
} from '../../store/catchedPokemons/action';
import { setLoaderAction } from '../../store/loader/actions';

const PokemonDetails = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.isLoading);
	const catchedPokemons = useSelector((state) => state.catchedPokemons);
	const pokemonName = useParams().pokemonName;
	const [selectedPokemon, setSelectedPokemon] = useState({
		name: 'noname',
		sprites: { front_default: 'nodata' },
		abilities: [{ ability: { name: 'no ability' } }],
	});

	useEffect(() => {
		fetchPokemon();
	}, [pokemonName]);

	const fetchPokemon = async () => {
		if (pokemonName) {
			dispatch(setLoaderAction(true));
			const pokemon = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
				{
					method: 'GET',
				}
			)
				.then((res) => res.json())
				.catch((error) => console.log(error))
				.finally(
					setTimeout(() => {
						// I just wanna show up the loader in any case. :)
						dispatch(setLoaderAction(false));
					}, 500)
				);
			setSelectedPokemon(pokemon);
		}
	};

	const handleBackBtn = () => {
		navigate('/');
	};

	const handleCatchBtn = (pokemonName) => {
		if (catchedPokemons.includes(pokemonName)) {
			dispatch(removeFromCatchedAction(pokemonName));
		} else {
			dispatch(addToCatchedAction(pokemonName));
		}
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<main className='pokemon-wrapper'>
					<h1>{selectedPokemon.name}</h1>
					<img
						src={selectedPokemon.sprites.front_default}
						alt={selectedPokemon.name}
					/>
					<div className='pokemon-detail-buttons-wrapper'>
						<Button
							btnTitle='Back'
							btnClass='pokemon-detail-buttons'
							handleEvent={handleBackBtn}
						/>
						<SwitchTransition mode='out-in'>
							<CSSTransition
								key={catchedPokemons.includes(pokemonName)}
								in={catchedPokemons.includes(pokemonName)}
								timeout={500}
								classNames='fade'
							>
								{catchedPokemons.includes(pokemonName) ? (
									<Button
										btnTitle='Release'
										btnClass='pokemon-detail-buttons release-btn'
										handleEvent={() => {
											handleCatchBtn(pokemonName);
										}}
									/>
								) : (
									<Button
										btnTitle='Catch'
										btnClass='pokemon-detail-buttons'
										handleEvent={() => {
											handleCatchBtn(pokemonName);
										}}
									/>
								)}
							</CSSTransition>
						</SwitchTransition>
					</div>
					<section className='pokemon-data'>
						Name: {selectedPokemon.name}
					</section>
					<section className='pokemon-data'>
						Weight: {selectedPokemon.weight}
					</section>
					<section className='pokemon-data'>
						Height: {selectedPokemon.height}
					</section>
					<section className='pokemon-data'>
						Abilities:{' '}
						{selectedPokemon.abilities
							.map((ability) => ability.ability.name)
							.join(', ')}
					</section>
				</main>
			)}
		</>
	);
};

export default PokemonDetails;
