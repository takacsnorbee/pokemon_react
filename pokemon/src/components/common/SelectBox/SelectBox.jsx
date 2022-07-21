import './SelectBox.css';

const SelectBox = ({ selectBoxClass, optionsData, handleEvent }) => {
	return (
		<select className={selectBoxClass} onChange={handleEvent}>
			<option value='' disabled>
				Choose pokemon type
			</option>
			{optionsData.map((pokemonType) => {
				return (
					<option value={pokemonType.name} key={pokemonType.url}>
						{pokemonType.name}
					</option>
				);
			})}
		</select>
	);
};

export default SelectBox;
