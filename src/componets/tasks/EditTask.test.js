import React from 'react';
import ReactDOM from 'react-dom';
import EditTask from './EditTask';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<EditTask />, div);

	// clean up code
	ReactDOM.unmountComponentAtNode(div);
});
