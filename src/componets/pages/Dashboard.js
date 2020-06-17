import React, { Component } from 'react';
import MainNav from '../layouts/MainNav';
import SecondaryNav from '../layouts/SecondaryNav';
import ProjectsList from '../projects/projectList/PjectsList';
import ProjectContext from '../../context/ProjectsContext';

export class Dashboard extends Component {
	static contextType = ProjectContext;
	render() {
		return (
			<div>
				<MainNav name={'dashboard'} history={this.props.history} />
				<SecondaryNav
					page={'Project'}
					link1={'/projects/createproject'}
					items={this.context.projects}
					setContext={this.context.setFilterdProjects}
				/>

				<main className='projects'>{<ProjectsList />}</main>
			</div>
		);
	}
}

export default Dashboard;
