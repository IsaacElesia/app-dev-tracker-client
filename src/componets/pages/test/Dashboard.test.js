import React from 'react';
import ReactDOM from 'react-dom';
import Dasboard from '../Dashboard';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<Dasboard />, div);

	// clean up code
	ReactDOM.unmountComponentAtNode(div);
});
