import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class SecondaryNav extends Component {
	handleClick = (btn) => {
		if (btn === 'all') {
			this.props.setContext('all');
		}
		if (btn === 'undone') {
			this.props.setContext('undone');
		}
		if (btn === 'completed') {
			this.props.setContext('completed');
		}
	};

	render() {
		const { page, link1 } = this.props;

		return (
			<nav className='secondary-nav'>
				<div className='secondary-nav-head'>
					<h2 className='h2-page-name'>{`${page}s`}</h2>
					<Link to={link1} className='new-page'>
						<i className='far fa-plus-square icon'></i>
						<span className='li-name'>New </span>
					</Link>
				</div>

				<div className='secondary-nav-btn'>
					<label htmlFor='all' className='checkbox'>
						<input
							type='radio'
							name='nav-checkbox'
							id='all'
							onClick={() => this.handleClick('all')}
						/>
						<span>All</span>
					</label>

					<label htmlFor='undone' className='checkbox'>
						<input
							type='radio'
							name='nav-checkbox'
							id='undone'
							onClick={() => this.handleClick('undone')}
						/>
						<span>Undone</span>
					</label>

					<label htmlFor='completed' className='checkbox'>
						<input
							type='radio'
							name='nav-checkbox'
							id='completed'
							onClick={() => this.handleClick('completed')}
						/>
						<span>Completed</span>
					</label>
				</div>
			</nav>
		);
	}
}

export default SecondaryNav;
