import React from 'react';
import ReactDOM from 'react-dom';
import SectionDetails from '../SectionDetails';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<SectionDetails />, div);

	// clean up code
	ReactDOM.unmountComponentAtNode(div);
});
