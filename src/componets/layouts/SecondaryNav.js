import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class SecondaryNav extends Component {
	handleClick = (btn) => {
		if (btn === 'in-progress') {
			this.props.setContext(null);
		}
		if (btn === 'completed') {
			this.props.setContext(true);
		}
	};

	render() {
		const { page, link1 } = this.props;

		return (
			<nav className='secondary-nav'>
				<h2 className='h2-page-name'>{`${page}s`}</h2>
				<div className='secondary-nav-btn'>
					<Link to={link1}>
						<i className='far fa-plus-square icon'></i>
						<span className='li-name'>New {page}</span>
					</Link>
					<button onClick={() => this.handleClick('in-progress')}>
						<i className='far fa-square icon'></i>
						<span className='li-name'>In-progress</span>
					</button>
					<button onClick={() => this.handleClick('completed')}>
						<i className='far fa-check-square icon'></i>
						<span className='li-name'>Completed</span>
					</button>
				</div>
			</nav>
		);
	}
}

export default SecondaryNav;
