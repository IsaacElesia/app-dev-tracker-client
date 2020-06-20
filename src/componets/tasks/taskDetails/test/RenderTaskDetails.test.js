import React from 'react';
import ReactDOM from 'react-dom';
import RenderTaskDetails from '../RenderTaskDetails';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<RenderTaskDetails />, div);

	// clean up code
	ReactDOM.unmountComponentAtNode(div);
});
