import { render, screen } from '@testing-library/react';
import Footer from './footer.js';

test('renders Footer', ()=>{
	render(<Footer />);
	const linkElement = screen.getByText(/Hoy/i);
	expect(linkElement).toBeInTheDocument();
});
