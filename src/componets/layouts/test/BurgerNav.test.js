import React from 'react';
import ReactDOM from 'react-dom';
import BurgerNav from '../BurgerNav';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<BurgerNav />, div);

	// clean up code
	ReactDOM.unmountComponentAtNode(div);
});
