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
	};

	componentDidMount() {
		try {
			this.fetchTasks().then((tasks) => this.filterTasks(tasks));
		} catch (err) {
			console.log(err);
		}
	}

	/* 	componentDidUpdate() {
		try {
			this.fetchTasks().then((tasks) => this.filterTasks(tasks));
		} catch (err) {
			console.log(err);
		}
	} */

	fetchTasks = () => {
		return ApiService.getItems('tasks').then((tasks) => {
			return tasks;
		});
	};

	filterTasks = (tasks) => {
		const filterdTasks = tasks.filter((task) => {
			return task.sectionId === Number(this.props.sectionId);
		});

		this.context.setTasks(filterdTasks);
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
		return (
			<>
				<RenderTaskList
					context={this.context}
					handleClick={this.handleClick}
					handleClose={this.handleClose}
					showModal={this.showModal}
				/>
			</>
		);
	}
}

export default TaskList;
