import './Loader.css';

const Loader = () => {
	return (
		<div className='loader-wrapper'>
			<div className='spinner-text'>Loading...</div>
			<div className='spinner spinner-red'></div>
			<div className='spinner spinner-blue'></div>
			<div className='spinner spinner-green'></div>
		</div>
	);
};

export default Loader;
