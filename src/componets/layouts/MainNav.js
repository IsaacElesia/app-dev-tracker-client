import React, { Component } from 'react';
import UserContext from '../../context/UsersContext';
import ApiService from '../../services/api-service';
import TokenService from '../../services/token-service';
import BurgerNav from './BurgerNav';

export class MainNav extends Component {
	static contextType = UserContext;

	componentDidMount() {
		try {
			const { setCurrentUser } = this.context;
			const id = TokenService.readJwtToken().user.id;
			ApiService.getItem('users', id).then((user) => {
				setCurrentUser(user);
			});
		} catch (err) {
			console.log(err);
		}
	}

	taskClass = () => {
		if (this.props.taskClass) return this.props.taskClass;
	};

	loogOut = () => {
		TokenService.clearAuthToken();
		this.props.history.push('/');
	};

	render() {
		const { currentUser } = this.context;

		return this.props.name === 'dashboard' ? (
			<header className='dashboard-header'>
				<div className='dashboard-nav'>
					<h1 className='h1'>Dashboard</h1>
					<button
						className='nav-btn logout-btn'
						name='logout'
						onClick={(e) => this.loogOut()}
					>
						log out
					</button>
				</div>
				<h3 className='h3'>
					Welcome <span className='welcom'>{currentUser.fullName}</span>
				</h3>
			</header>
		) : (
			<>
				<div className={`page-nav-main ${this.taskClass()}`}>
					<div className='page-nav-icons'>
						<i
							className=' back-icon'
							onClick={() => this.props.history.push(this.props.destination)}
						>
							<i className='fas fa-arrow-alt-circle-left'></i>
						</i>
						<h2 className='h2-section'>{this.props.name}</h2>
					</div>

					<div className='page-nav-btn'>
						<button
							className='nav-btn'
							name='assign'
							onClick={(e) => this.props.handleClick(e)}
						>
							Asign
						</button>
						<button
							className='nav-btn'
							name='team'
							onClick={(e) => this.props.handleClick(e)}
						>
							Team
						</button>
						<button
							className='nav-btn'
							name='edit'
							onClick={(e) => this.props.handleClick(e)}
						>
							Edit
						</button>
						<button
							className='nav-btn'
							name='deleteItem'
							onClick={(e) => this.props.handleClick(e)}
						>
							Delete
						</button>
						<button
							className='nav-btn logout-btn'
							name='logout'
							onClick={(e) => this.loogOut()}
						>
							log out
						</button>
					</div>
				</div>
				<BurgerNav
					handleClick={this.props.handleClick}
					loogOut={this.loogOut}
					history={this.props.history}
					destination={this.props.destination}
					name={this.props.name}
					taskClass={this.props.taskClass}
				/>
			</>
		);
	}
}

export default MainNav;
