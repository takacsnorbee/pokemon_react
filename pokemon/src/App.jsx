import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import PokemonsList from './components/PokemonsList/PokemonList';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='*' element={<Navigate to='/' />} />
				<Route path='/' element={<PokemonsList />} />
				<Route path='/pokemon' element={<PokemonsList />} />
				<Route path='/pokemon/:pokemonId' element={<PokemonDetails />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
