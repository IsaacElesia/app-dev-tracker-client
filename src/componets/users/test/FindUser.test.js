import React from 'react';
import ReactDOM from 'react-dom';
import FindUser from '../FindUser';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<FindUser />, div);

	// clean up code
	ReactDOM.unmountComponentAtNode(div);
});
