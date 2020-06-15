import React, { Component } from 'react';

export class BurgerNav extends Component {
	state = {
		showMenu: false,
		open: '',
	};

	toggleMenu = () => {
		const { showMenu } = this.state;
		if (!showMenu) {
			this.setState({
				showMenu: true,
				open: 'open',
			});
		} else {
			this.setState({
				showMenu: false,
				open: '',
			});
		}
	};

	render() {
		const { open } = this.state;
		return (
			<div className='burger-nav'>
				<div className='page-nav-icons burger'>
					<i
						className=' back-icon'
						onClick={() => this.props.history.push(this.props.destination)}
					>
						<i className='fas fa-arrow-alt-circle-left'></i>
					</i>
					<h2 className='h2-section'>{this.props.name}</h2>
				</div>
				<div className='menu-btn' onClick={this.toggleMenu}>
					<span className={`menu-btn__burger ${open}`}></span>
				</div>
				<nav className={`nav ${open}`}>
					<div className={`menu-nav ${open}`}>
						<div className={`menu-nav__item active ${open}`}>
							<button
								className='menu-nav__link'
								name='logout'
								onClick={(e) => {
									this.toggleMenu();
									this.props.loogOut();
								}}
							>
								log out
							</button>
						</div>
						<div className={`menu-nav__item active ${open}`}>
							<button
								className='menu-nav__link'
								name='assign'
								onClick={(e) => {
									this.toggleMenu();
									this.props.handleClick(e);
								}}
							>
								Asign
							</button>
						</div>
						<div className={`menu-nav__item active ${open}`}>
							<button
								className='	menu-nav__link'
								name='team'
								onClick={(e) => {
									this.toggleMenu();
									this.props.handleClick(e);
								}}
							>
								Team
							</button>
						</div>
						<div className={`menu-nav__item active ${open}`}>
							<button
								className='menu-nav__link'
								name='edit'
								onClick={(e) => {
									this.toggleMenu();
									this.props.handleClick(e);
								}}
							>
								Edit
							</button>
						</div>
						<div className={`menu-nav__item active ${open}`}>
							<button
								className='menu-nav__link'
								name='deleteItem'
								onClick={(e) => {
									this.toggleMenu();
									this.props.handleClick(e);
								}}
							>
								Delete
							</button>
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

export default BurgerNav;
