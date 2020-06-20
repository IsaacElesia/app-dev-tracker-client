import React from 'react';
import ReactDOM from 'react-dom';
import RenderCreteSection from '../RenderCreateSection';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<RenderCreteSection />, div);

	// clean up code
	ReactDOM.unmountComponentAtNode(div);
});
