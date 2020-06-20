import React from 'react';
import ReactDOM from 'react-dom';
import RenderSectionDetails from '../RenderSectionDetails';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<RenderSectionDetails />, div);

	// clean up code
	ReactDOM.unmountComponentAtNode(div);
});
