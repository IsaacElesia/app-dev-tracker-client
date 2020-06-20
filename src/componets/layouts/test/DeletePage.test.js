import React from 'react';
import ReactDOM from 'react-dom';
import DeletePage from '../DeletePage';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<DeletePage />, div);

	// clean up code
	ReactDOM.unmountComponentAtNode(div);
});
