import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UsersContext';

export class SecondaryNav extends Component {
	static contextType = UserContext;
	render() {
		const { page, link1 } = this.props;
		return (
			<nav className='secondary-nav'>
				<div className='secondary-nav-btn'>
					<Link to={link1}>
						<i className='far fa-plus-square icon'></i>
						<span className='li-name'>New {page}</span>
					</Link>
					<button>
						<i className='far fa-square icon'></i>
						<span className='li-name'>In-progress</span>
					</button>
					<button>
						<i className='far fa-check-square icon'></i>
						<span className='li-name'>Completed</span>
					</button>
				</div>
			</nav>
		);
	}
}

export default SecondaryNav;
