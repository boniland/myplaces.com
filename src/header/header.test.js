import { render, screen } from '@testing-library/react';
import Header, {getDate} from './header.js';

test('renders Header', ()=>{
	render(<Header />);
	// contains date in format: dayName day, monthName, year
	const linkElement = screen.getByText(getDate());
	expect(linkElement).toBeInTheDocument();
});

