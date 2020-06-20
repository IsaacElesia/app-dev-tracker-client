import React from 'react';
import ReactDOM from 'react-dom';
import CreateSection from '../CreateSection';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<CreateSection />, div);

	// clean up code
	ReactDOM.unmountComponentAtNode(div);
});
