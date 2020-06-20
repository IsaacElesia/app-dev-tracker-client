import React from 'react';
import ReactDOM from 'react-dom';
import TaskDetails from '../TaskDetails';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<TaskDetails />, div);

	// clean up code
	ReactDOM.unmountComponentAtNode(div);
});
