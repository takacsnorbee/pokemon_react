import './SelectBox.css';

const SelectBox = ({ selectBoxClass, optionsData, handleEvent }) => {
	return (
		<select
			className={selectBoxClass}
			onChange={handleEvent}
			defaultValue='default'
		>
			<option value='default' disabled hidden>
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
