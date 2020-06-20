import React from 'react';
import ReactDOM from 'react-dom';
import SecondaryNav from '../SecondaryNav';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<SecondaryNav />, div);

	// clean up code
	ReactDOM.unmountComponentAtNode(div);
});
