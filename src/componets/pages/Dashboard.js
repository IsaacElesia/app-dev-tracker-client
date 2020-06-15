import React, { Component } from 'react';
import MainNav from '../layouts/MainNav';
import SecondaryNav from '../layouts/SecondaryNav';
import ProjectsList from '../projects/projectList/PjectsList';

export class Dashboard extends Component {
	render() {
		return (
			<div>
				<MainNav name={'dashboard'} history={this.props.history} />
				<SecondaryNav page={'Project'} link1={'/projects/createproject'} />

				<main className='projects'>{<ProjectsList />}</main>
			</div>
		);
	}
}

export default Dashboard;
