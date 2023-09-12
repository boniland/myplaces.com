import { render, screen } from '@testing-library/react';
import EmployeeTracker from './employee-tracker.js';

test('renders EmployeeTracker', ()=>{
	render(<EmployeeTracker />);
	const linkElement = screen.getByText('EmployeeTracker');
	expect(linkElement).toBeInTheDocument();
});

