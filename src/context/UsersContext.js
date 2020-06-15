import React, { Component } from 'react';

const UsersContext = React.createContext({
	users: [],
	currentUser: {},
});
export default UsersContext;

export class UsersProvider extends Component {
	state = {
		users: [],
		currentUser: [],
	};

	setUsers = (users) => {
		this.setState({ users });
	};

	setCurrentUser = (currentUser) => {
		this.setState({ currentUser });
	};

	render() {
		const value = {
			users: this.state.users,
			setUsers: this.state.users,
			currentUser: this.state.currentUser,
			setCurrentUser: this.setCurrentUser,
		};
		return (
			<UsersContext.Provider value={value}>
				{this.props.children}
			</UsersContext.Provider>
		);
	}
}
