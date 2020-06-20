import React from 'react';
import ReactDOM from 'react-dom';
import EditSection from './EditSection';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<EditSection />, div);

	// clean up code
	ReactDOM.unmountComponentAtNode(div);
});
