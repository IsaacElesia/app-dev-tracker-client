import React from 'react';
import ReactDOM from 'react-dom';
import RenderCreateTask from '../RenderCreateTask';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<RenderCreateTask />, div);

	// clean up code
	ReactDOM.unmountComponentAtNode(div);
});
