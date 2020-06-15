import React, { Component } from 'react';
import ProjectContext from '../../../context/ProjectsContext';
import moment from 'moment';
import ApiService from '../../../services/api-service';
import TokenService from '../../../services/token-service';
import RenderCreateProject from './RenderCreateProject';

export class CreateProject extends Component {
	static contextType = ProjectContext;
	state = {
		projectId: '',
		startDate: `${moment().format('ddd MMM DD YYYY HH:mm:ss')}`,
		dueDate: '',
		projectName: '',
		projectRepo: '',
		completed: false,
		createdBy: '',
		description: '',
		projectNameTouch: false,
		dueDateTouch: false,
		editMode: false,
	};

	componentDidMount() {
		const { project } = this.props;
		if (project) {
			this.setState({
				projectId: project.projectId,
				startDate: `${moment(project.startDate).format('YYYY-MM-DD')}`,
				dueDate: `${moment(project.dueDate).format('YYYY-MM-DD')}`,
				projectName: project.projectName,
				projectRepo: project.projectRepo,
				completed: project.completed,
				createdBy: project.createdBy,
				description: project.description,
				editMode: true,
			});
		}
	}

	handleChange = (e) => {
		let time, m;

		if (!this.state.createdBy)
			this.setState({ createdBy: TokenService.readJwtToken().user.id });

		switch (e.target.name) {
			case 'projectName':
				return this.setState({
					projectName: e.target.value,
					projectNameTouch: true,
				});
			case 'dueDate':
				time = e.target.value;
				m = moment(time).format('YYYY-MM-DD');
				return this.setState({ dueDate: `${m}`, dueDateTouch: true });
			case 'startDate':
				time = e.target.value;
				m = moment(time).format('YYYY-MM-DD');
				return this.setState({ startDate: `${m}` });
			default:
				return this.setState({ [e.target.name]: e.target.value });
		}
	};

	handleDisabled = () => {
		if (this.state.projectName.length < 2 || this.state.dueDate.length < 6) {
			return true;
		}
	};

	handleError = (value) => {
		switch (value) {
			case 'projectName':
				return this.state.projectName.length < 2 ? (
					<p>Project name must be more than one character.</p>
				) : (
					''
				);
			case 'dueDate':
				return this.state.dueDate.length < 6 ? <p>Iput a valid date</p> : '';
			default:
				return '';
		}
	};

	goBack = () => {
		if (!this.state.editMode) {
			const destination = `/dashboard`;
			this.props.history.push(destination);
		} else {
			this.props.handleClose();
		}
	};

	handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { setProject } = this.context;
			const {
				projectId,
				startDate,
				dueDate,
				projectName,
				projectRepo,
				completed,
				createdBy,
				description,
				editMode,
			} = this.state;

			const { history } = this.props;
			const destination = '/dashboard';
			const body = {
				projectId,
				startDate: `${moment(startDate).format('ddd MMM DD YYYY')}`,
				dueDate: `${moment(dueDate).format('ddd MMM DD YYYY')}`,
				projectName,
				projectRepo,
				completed,
				createdBy,
				description,
			};

			if (!editMode) {
				const project = await ApiService.postItemWithAuth('projects', body);
				const body2 = { projectId: project.projectId, userId: createdBy };
				await ApiService.postItemWithAuth('project/team', body2);
				history.push(destination);
			}

			if (editMode) {
				await ApiService.updateItem(`projects/${projectId}`, body);
				setProject(body);

				this.props.handleClose();
			}
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		return (
			<>
				<RenderCreateProject
					state={this.state}
					handleSubmit={this.handleSubmit}
					handleError={this.handleError}
					handleChange={this.handleChange}
					handleDisabled={this.handleDisabled}
					goBack={this.goBack}
				/>
			</>
		);
	}
}

export default CreateProject;
