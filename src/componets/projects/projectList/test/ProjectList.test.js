import React from 'react';
import ReactDOM from 'react-dom';
import ProjectList from '../PjectsList';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<ProjectList />, div);

	// clean up code
	ReactDOM.unmountComponentAtNode(div);
});
