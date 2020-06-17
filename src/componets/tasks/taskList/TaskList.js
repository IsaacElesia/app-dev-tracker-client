import React, { Component } from 'react';
import ApiService from '../../../services/api-service';
import TaskContext from '../../../context/TaskContext';
import FindUser from '../../users/FindUser';
import TeamMembers from '../../teams/TeamMembers';
import DeletPage from '../../layouts/DeletePage';
import RenderTaskList from './RenderTaskList';

export class TaskList extends Component {
	static contextType = TaskContext;

	state = {
		assign: false,
		team: false,
		deleteTask: false,
		id: '',
		teamMembers: [],
		taskLenght: 0,
		numCompleted: 0,
	};

	componentDidMount() {
		try {
			this.fetchTasks().then((tasks) => {
				this.filterTasks(tasks);
			});
		} catch (err) {
			console.log(err);
		}
	}

	updateCompleted = () => {
		const { taskLenght, numCompleted } = this.state;
		let body = false;
		if (taskLenght !== 0 && numCompleted !== 0) {
			if (taskLenght === numCompleted) {
				body = true;
			}
		}

		ApiService.updateItem(`sections/${this.props.sectionId}`, {
			completed: body,
		});
	};

	fetchTasks = () => {
		return ApiService.getItems('tasks').then((tasks) => {
			return tasks;
		});
	};

	filterTasks = (tasks) => {
		const filterdTasks = tasks.filter((task) => {
			if (task.sectionId === Number(this.props.sectionId) && task.completed)
				this.setNumCompleted();
			return task.sectionId === Number(this.props.sectionId);
		});
		this.setTaskLength(filterdTasks.length);
		this.context.setTasks(filterdTasks);
	};

	setTaskLength = (length) => {
		this.setState({ taskLenght: length });
	};

	setNumCompleted = () => {
		this.setState({ numCompleted: this.state.numCompleted + 1 });
	};

	handleClick = (e, id) => {
		this.setState({ [e.target.name]: true, id });
		this.fetchTeamMembers(id);
	};

	handleClose = (e) => {
		this.setState({ assign: false, team: false, deleteTask: false });
	};

	fetchTeamMembers = async (id) => {
		const members = await ApiService.getItems(`task/team?taskid=${id}`);
		this.setState({ teamMembers: members });
	};

	goBack = (sectionId) => {
		const { history } = this.props;
		const destination = `/sections/${sectionId}`;
		history.push(destination);
		//	this.componentDidUpdate();
	};

	showModal = (id, task) => {
		if (this.state.id === id) {
			const { assign, team, deleteTask, teamMembers } = this.state;

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

			if (deleteTask) {
				return (
					<DeletPage
						handleClose={this.handleClose}
						name={task.description}
						id={id}
						endPoint={`tasks/${id}`}
						pageName={'Delete Task'}
						goBack={() => this.goBack(task.sectionId)}
						open={deleteTask}
					/>
				);
			}
		}
	};

	render() {
		this.updateCompleted();
		return (
			<>
				<RenderTaskList
					context={this.context}
					handleClick={this.handleClick}
					handleClose={this.handleClose}
					showModal={this.showModal}
					setNumCompleted={this.setNumCompleted}
					setTaskLength={this.setTaskLength}
				/>
			</>
		);
	}
}

export default TaskList;
