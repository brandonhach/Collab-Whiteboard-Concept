import React, { useLayoutEffect, useState } from 'react';
import rough from 'roughjs';

const generator = rough.generator();
const windowHeight = window.innerHeight / 1.2;
const windowWidth = window.innerWidth / 1.05;

function createElement(x, y, type) {
	let roughElement;
	if (type === 'path') {
		// Initialize the path with the starting point
		roughElement = generator.path(`M ${x},${y}`);
	}
	return { x, y, type, roughElement, points: [{ x, y }] }; // Include points array to store path points
}

//chat gpt
function getAdjustedMousePos(e) {
	const canvas = document.getElementById('canvas');
	const rect = canvas.getBoundingClientRect();
	const scaleX = canvas.width / rect.width;
	const scaleY = canvas.height / rect.height;
	return {
		offsetX: (e.clientX - rect.left + window.scrollX) * scaleX,
		offsetY: (e.clientY - rect.top + window.scrollY) * scaleY,
	};
}

const Canvas = () => {
	const [elements, setElements] = useState([]);
	const [drawing, setDrawing] = useState(false);

	useLayoutEffect(() => {
		const canvas = document.getElementById('canvas');
		const ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const roughCanvas = rough.canvas(canvas);

		elements.forEach((element) => {
			if (element.type === 'path') {
				roughCanvas.draw(element.roughElement);
			}
		});
	}, [elements]);

	const handleMouseDown = (e) => {
		setDrawing(true);
		const { offsetX, offsetY } = getAdjustedMousePos(e);

		// Start a new path element
		const element = createElement(offsetX, offsetY, 'path');
		setElements((prevState) => [...prevState, element]);
	};

	const handleMouseMove = (e) => {
		if (!drawing) return;

		const { offsetX, offsetY } = getAdjustedMousePos(e);

		// Clone the elements array
		const elementsCopy = [...elements];
		const currentElement = elementsCopy[elementsCopy.length - 1];

		// Add the new point to the points array
		currentElement.points.push({ x: offsetX, y: offsetY });

		// Reconstruct the path string from the points
		const pathData = currentElement.points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');
		currentElement.roughElement = generator.path(pathData);

		setElements(elementsCopy);
	};

	const handleMouseUp = () => {
		setDrawing(false);
	};

	return (
		<div className='w-screen h-screen bg-black flex items-center justify-center'>
			<canvas
				id='canvas'
				className='bg-white border-2 border-gray-300'
				width={windowWidth}
				height={windowHeight}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseOut={handleMouseUp} // Add this to handle the case where the mouse leaves the canvas
			></canvas>
		</div>
	);
};

export default Canvas;
