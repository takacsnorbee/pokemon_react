const Input = ({ inputClass, inputPlaceholder, handleEvent, inputType }) => {
	return (
		<input
			type={inputType}
			className={inputClass}
			placeholder={inputPlaceholder}
			onChange={handleEvent}
		/>
	);
};

export default Input;
