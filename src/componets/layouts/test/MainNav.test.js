import React from 'react';
import ReactDOM from 'react-dom';
import MainNav from '../MainNav';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<MainNav />, div);

	// clean up code
	ReactDOM.unmountComponentAtNode(div);
});
