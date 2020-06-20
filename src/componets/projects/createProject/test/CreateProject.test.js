import React from 'react';
import ReactDOM from 'react-dom';
import CreateProject from '../CreateProject';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<CreateProject />, div);

	// clean up code
	ReactDOM.unmountComponentAtNode(div);
});
