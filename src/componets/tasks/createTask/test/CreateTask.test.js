import React from 'react';
import ReactDOM from 'react-dom';
import CreateTask from '../CreateTask';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<CreateTask />, div);

	// clean up code
	ReactDOM.unmountComponentAtNode(div);
});
