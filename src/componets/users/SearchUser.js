import React, { Component } from 'react';
import ApiService from '../../services/api-service';

export class SearchUser extends Component {
	handleChange = (e) => {
		let name = e.target.value;

		if (name.length > 2) {
			ApiService.getItems(`users/?name=${name}`).then((users) => {
				this.props.setUsers(users);
			});
		}
	};

	render() {
		return (
			<div className='search'>
				<input
					name='name'
					id='name'
					className='search-box'
					placeholder='User name'
					onChange={this.handleChange}
				/>
			</div>
		);
	}
}

export default SearchUser;
