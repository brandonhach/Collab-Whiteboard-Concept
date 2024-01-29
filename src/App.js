import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/ui/navbar';
import About from './pages/about';
import Canvas from './pages/canvas';

function App() {
	return (
		<BrowserRouter>
			<div className='w-screen h-screen'>
				<Navbar />
				<Routes>
					<Route path='/about' element={<About />} />
					<Route path='/canvas' element={<Canvas />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
