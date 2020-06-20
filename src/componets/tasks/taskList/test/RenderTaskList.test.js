import React from 'react';
import ReactDOM from 'react-dom';
import RenderTaskList from '../RenderTaskList';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<RenderTaskList />, div);

	// clean up code
	ReactDOM.unmountComponentAtNode(div);
});
