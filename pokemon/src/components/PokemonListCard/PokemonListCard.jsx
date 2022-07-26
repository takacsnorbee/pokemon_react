import './PokemonListCard.css';

const PokemonListCard = ({
	pokemonName,
	clickOnPokemonListCard,
	pokemonListCardClass,
	optionalClass,
}) => {
	return (
		<div
			className={`${pokemonListCardClass} ${optionalClass}`}
			onClick={() => clickOnPokemonListCard(pokemonName)}
		>
			{pokemonName}
		</div>
	);
};

export default PokemonListCard;
