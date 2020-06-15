import React, { Component } from 'react';
import ProjectsContext from '../../../context/ProjectsContext';
import ApiService from '../../../services/api-service';
import FindUser from '../../users/FindUser';
import TeamMembers from '../../teams/TeamMembers';
import DeletPage from '../../layouts/DeletePage';
import EditProject from '../EditProject';
import RenderProjectDetails from './RenderProjectDetails';

export class ProjectDetails extends Component {
	static contextType = ProjectsContext;
	state = {
		assign: false,
		team: false,
		deleteItem: false,
		edit: false,
		id: '',
		teamMembers: [],
	};

	componentDidMount() {
		const { projectId } = this.props.match.params;
		try {
			this.setState({ id: Number(projectId) });
			ApiService.getItem('projects', projectId).then((project) => {
				this.context.setProject(project);
			});
		} catch (err) {
			console.log(err);
		}
	}

	handleClick = (e) => {
		this.setState({ [e.target.name]: true });
		this.fetchTeamMembers(this.state.id);
	};

	handleClose = (e) => {
		this.setState({
			assign: false,
			team: false,
			deleteItem: false,
			edit: false,
		});
	};

	fetchTeamMembers = async (id) => {
		const members = await ApiService.getItems(`project/team?projectid=${id}`);
		this.setState({ teamMembers: members });
	};

	goBack = () => {
		const { history } = this.props;
		const destination = `/dashboard`;
		history.push(destination);
	};

	showModal = (id, project) => {
		const { assign, team, deleteItem, teamMembers, edit } = this.state;

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

		if (deleteItem) {
			return (
				<DeletPage
					handleClose={this.handleClose}
					name={project.projectName}
					description={project.description}
					id={id}
					endPoint={`projects/${id}`}
					pageName={'Delete Project'}
					goBack={() => this.goBack()}
					open={deleteItem}
				/>
			);
		}

		if (edit) {
			return (
				<EditProject
					handleClose={this.handleClose}
					id={id}
					endPoint={`projects/${id}`}
					project={project}
					open={edit}
				/>
			);
		}
	};

	render() {
		return (
			<>
				<RenderProjectDetails
					handleClick={this.handleClick}
					history={this.props.history}
					projectId={this.props.match.params.projectId}
					showModal={this.showModal}
				/>
			</>
		);
	}
}

export default ProjectDetails;
