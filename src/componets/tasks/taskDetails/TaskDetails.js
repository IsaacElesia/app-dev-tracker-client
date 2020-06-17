import React, { Component } from 'react';
import TaskContext from '../../../context/TaskContext';
import ApiService from '../../../services/api-service';
import TokenService from '../../../services/token-service';
import FindUser from '../../users/FindUser';
import TeamMembers from '../../teams/TeamMembers';
import DeletPage from '../../layouts/DeletePage';
import EditTask from '../EditTask';
import RenderTaskDetails from './RenderTaskDetails';

export class TaskDetails extends Component {
	static contextType = TaskContext;
	state = {
		assign: false,
		team: false,
		deleteItem: false,
		edit: false,
		id: '',
		teamMembers: [],
		completed: false,
	};

	componentDidMount() {
		const { taskId } = this.props.match.params;
		try {
			this.setState({ id: taskId });
			ApiService.getItem('tasks', taskId).then((task) => {
				this.context.setTask(task);
				this.setState({ completed: task.completed });
			});
		} catch (err) {
			console.log(err);
		}
	}

	fetchTeamMembers = async (id) => {
		const members = await ApiService.getItems(`task/team?taskid=${id}`);
		this.setState({ teamMembers: members });
	};

	handleChange = (e) => {
		const { checked } = e.target;
		const { task } = this.context;
		const body = { completed: checked };

		this.setState({ completed: checked });

		ApiService.updateItem(`tasks/${task.taskId}`, body);
	};

	isChecked = () => {
		return this.state.completed ? 'checked' : '';
	};

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

	loogOut = () => {
		TokenService.clearAuthToken();
		this.props.history.push('/');
	};

	showModal = (task) => {
		const { id, assign, team, deleteItem, edit, teamMembers } = this.state;

		if (assign) {
			return (
				<FindUser
					handleClose={this.handleClose}
					taskId={id}
					sectionId={task.sectionId}
					endpoint={'task/team'}
					open={assign}
				/>
			);
		}
		if (team && teamMembers.length > 0) {
			return (
				<TeamMembers
					handleClose={this.handleClose}
					members={teamMembers}
					teamId={'taskTeamId'}
					team={'Task Team'}
					open={team}
				/>
			);
		}

		if (deleteItem) {
			return (
				<DeletPage
					handleClose={this.handleClose}
					name={task.description}
					id={id}
					endPoint={`tasks/${id}`}
					pageName={'Delete Task'}
					goBack={this.props.history.goBack}
					open={deleteItem}
				/>
			);
		}

		if (edit) {
			return (
				<EditTask
					handleClose={this.handleClose}
					id={id}
					endPoint={`tasks/${id}`}
					task={task}
				/>
			);
		}
	};

	render() {
		return (
			<>
				<RenderTaskDetails
					completed={this.state.completed}
					isChecked={this.isChecked}
					handleChange={this.handleChange}
					handleClick={this.handleClick}
					handleClose={this.handleClose}
					showModal={this.showModal}
					history={this.props.history}
					logOut={this.loogOut}
				/>
			</>
		);
	}
}

export default TaskDetails;
