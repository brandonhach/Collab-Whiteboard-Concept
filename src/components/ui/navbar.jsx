import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const Navbar = () => {
	return (
		<div className='w-screen h-14 bg-slate-800 flex justify-between items-center px-4 absolute'>
			<div className='flex justify-around'>
				<Link to='/' className='text-white pr-4'>
					Home
				</Link>
				<Link to='/about' className='text-white'>
					About
				</Link>
				<Link to='/canvas' className='text-white'>
					Canvas
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
