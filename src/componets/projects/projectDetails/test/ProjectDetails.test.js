import React from 'react';
import ReactDOM from 'react-dom';
import ProjectDetails from '../ProjectDetails';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<ProjectDetails />, div);

	// clean up code
	ReactDOM.unmountComponentAtNode(div);
});
