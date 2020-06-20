import React from 'react';
import ReactDOM from 'react-dom';
import RenderCreateProject from '../RenderCreateProject';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<RenderCreateProject />, div);

	// clean up code
	ReactDOM.unmountComponentAtNode(div);
});
