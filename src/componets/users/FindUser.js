import React, { Component } from 'react';
import SearchUser from './SearchUser';
import UsersList from './UsersList';
import ApiService from '../../services/api-service';
import Modal from '../modal/Modal';

export class FindUser extends Component {
	state = {
		users: [],
		name: '',
		windowOffset: 0,
	};

	componentDidMount() {
		if (this.props.open) {
			this.setState({ windowOffset: window.scrollY });
			document.body.setAttribute(
				'style',
				`position: fixed; top: ${this.windowOffset}px; left:0; right:0;`
			);
		}
	}

	componentWillUnmount() {
		document.body.setAttribute('style', '');
		window.scrollTo(0, this.state.windowOffset);
	}

	setUsers = (users) => {
		this.setState({ users });
	};
	setName = (name) => {
		this.setState({ name });
	};

	addUser = (userId) => {
		const { taskId, sectionId, projectId, endpoint } = this.props;

		let body;
		if (taskId && sectionId && userId) body = { taskId, sectionId, userId };
		if (projectId && sectionId && userId) {
			body = { projectId, sectionId, userId };
		} else if (projectId && userId) {
			body = { projectId, userId };
		}

		ApiService.postItemWithAuth(endpoint, body).then((res) => {
			this.props.handleClose();
		});
	};

	render() {
		return (
			<Modal handleClose={this.props.handleClose}>
				<SearchUser setName={this.setName} setUsers={this.setUsers} />
				<UsersList users={this.state.users} addUser={this.addUser} />
			</Modal>
		);
	}
}

export default FindUser;
