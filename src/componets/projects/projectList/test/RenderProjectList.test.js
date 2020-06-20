import React from 'react';
import ReactDOM from 'react-dom';
import RenderProjectList from '../RenderProjectList';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<RenderProjectList />, div);

	// clean up code
	ReactDOM.unmountComponentAtNode(div);
});
