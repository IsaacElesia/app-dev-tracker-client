import React from 'react';
import ReactDOM from 'react-dom';
import RenderProjectDetails from '../RenderProjectDetails';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<RenderProjectDetails />, div);

	// clean up code
	ReactDOM.unmountComponentAtNode(div);
});
