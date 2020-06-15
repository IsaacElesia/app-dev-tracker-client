import React, { Component } from 'react';
import ApiService from '../../../services/api-service';
import ProjectsContext from '../../../context/ProjectsContext';
import FindUser from '../../users/FindUser';
import TeamMembers from '../../teams/TeamMembers';
import DeletPage from '../../layouts/DeletePage';
import RenderProjectList from './RenderProjectList';

export class PjectsList extends Component {
	static contextType = ProjectsContext;

	state = {
		assign: false,
		team: false,
		deleteProject: false,
		id: '',
		teamMembers: [],
	};

	componentDidMount() {
		try {
			ApiService.getItems('projects').then((projects) => {
				this.context.setProjects(projects);
			});
		} catch (err) {
			console.log(err);
		}
	}

	handleClick = (e, id) => {
		this.setState({ [e.target.name]: true, id });
		this.fetchTeamMembers(id);
	};

	handleClose = (e) => {
		this.setState({ assign: false, team: false, deleteProject: false });
	};

	fetchTeamMembers = async (id) => {
		const members = await ApiService.getItems(`project/team?projectid=${id}`);
		this.setState({ teamMembers: members });
	};

	goBack = (projectId) => {
		const { history } = this.props;
		const destination = `/projects/${projectId}`;
		history.push(destination);
	};

	showModal = (id, project) => {
		if (this.state.id === id) {
			const { assign, team, deleteProject, teamMembers } = this.state;

			if (assign) {
				return (
					<FindUser
						handleClose={this.handleClose}
						projectId={id}
						endpoint={'project/team'}
						open={assign}
					/>
				);
			}
			if (team && teamMembers.length > 0) {
				return (
					<TeamMembers
						handleClose={this.handleClose}
						members={teamMembers}
						teamId={'projectTeamId'}
						team={'Project Team'}
						open={team}
					/>
				);
			}

			if (deleteProject) {
				return (
					<DeletPage
						handleClose={this.handleClose}
						name={project.projectName}
						description={project.description}
						id={id}
						endPoint={`projects/${id}`}
						pageName={'Delete Project'}
						goBack={() => this.handleClose()}
						open={deleteProject}
					/>
				);
			}
		}
	};

	render() {
		return (
			<div>
				<RenderProjectList
					context={this.context}
					handleClick={this.handleClick}
					showModal={this.showModal}
				/>
			</div>
		);
	}
}

export default PjectsList;
