import { render, screen } from '@testing-library/react';
import Display from './display.js';

test('renders Display', ()=>{
	render(<Display />);
	const linkElement = screen.getByText('Display');
	expect(linkElement).toBeInTheDocument();
});

