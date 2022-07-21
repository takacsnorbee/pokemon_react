const Button = ({ btnTitle, btnClass, handleEvent }) => {
	return (
		<button className={btnClass} onClick={handleEvent}>
			{btnTitle}
		</button>
	);
};

export default Button;
