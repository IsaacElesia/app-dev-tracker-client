import React, { Component } from 'react';

export class UsersList extends Component {
	handleClick = (userId) => {
		this.props.addUser(userId);
	};

	renderUsers = () => {
		const { users } = this.props;
		if (users.length > 0) {
			return users.map((user) => {
				return (
					<div
						className='card'
						key={user.userId}
						onClick={() => this.handleClick(user.userId)}
					>
						<div className='card-project'>
							<div className='card-details user'>
								<p className='user-name'>{user.fullName}</p>
								<p className='user-email'>{user.email}</p>
							</div>
						</div>
					</div>
				);
			});
		}
		return '';
	};
	render() {
		return <div className='box'>{this.renderUsers()}</div>;
	}
}

export default UsersList;
