import React, { Component } from 'react';
import TaskContext from '../../../context/TaskContext';
import moment from 'moment';
import ApiService from '../../../services/api-service';
import TokenService from '../../../services/token-service';
import RenderCreateTask from './RenderCreateTask';

export class CreateSection extends Component {
	static contextType = TaskContext;
	state = {
		taskId: '',
		sectionId: '',
		startDate: `${moment().format('ddd MMM DD YYYY HH:mm:ss')}`,
		dueDate: '',
		description: '',
		completed: false,
		createdBy: '',
		descriptionTouch: false,
		dueDateTouch: false,
		editMode: false,
	};

	componentDidMount() {
		const { task } = this.props;
		if (task) {
			this.setState({
				taskId: task.taskId,
				sectionId: task.sectionId,
				startDate: `${moment(task.startDate).format(
					'ddd MMM DD YYYY HH:mm:ss'
				)}`,
				dueDate: `${moment(task.dueDate).format('YYYY-MM-DD')}`,
				description: task.description,
				completed: task.completed,
				createdBy: task.createdBy,
				editMode: true,
			});
		}
	}

	handleChange = (e) => {
		let time, m;

		if (!this.state.sectionId) {
			const { sectionId } = this.props.match.params;
			this.setState({ sectionId });
		}

		if (!this.state.createdBy)
			this.setState({ createdBy: TokenService.readJwtToken().user.id });

		if (!this.state.completed) {
			this.setState({ completed: false });
		}

		switch (e.target.name) {
			case 'dueDate':
				time = e.target.value;
				m = moment(time).format('YYYY-MM-DD');
				return this.setState({ dueDate: `${m}`, dueDateTouch: true });
			case 'startDate':
				time = e.target.value;
				m = moment(time).format('YYYY-MM-DD');
				return this.setState({ startDate: `${m}` });
			case 'description':
				return this.setState({
					description: e.target.value,
					descriptionTouch: true,
				});
			default:
				return this.setState({ [e.target.name]: e.target.value });
		}
	};

	handleDisabled = () => {
		if (this.state.description.length <= 5 || this.state.dueDate.length < 6) {
			return true;
		}
	};

	handleError = (value) => {
		switch (value) {
			case 'description':
				return this.state.description.length < 5 ? (
					<p>Your description must be more than five characters.</p>
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
			const destination = `/sections/${this.props.match.params.sectionId}`;
			this.props.history.push(destination);
		} else {
			this.props.handleClose();
		}
	};

	handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { setTask } = this.context;
			const {
				taskId,
				createdBy,
				startDate,
				dueDate,
				completed,
				description,
				sectionId,
				editMode,
			} = this.state;

			const { history } = this.props;

			const body = {
				taskId,
				createdBy,
				startDate: `${moment(startDate).format('ddd MMM DD YYYY')}`,
				dueDate: `${moment(dueDate).format('ddd MMM DD YYYY')}`,
				completed,
				description,
				sectionId,
			};

			if (!editMode) {
				const destination = `/sections/${sectionId}`;
				const task = await ApiService.postItemWithAuth('tasks', body);
				const body2 = {
					taskId: task.taskId,
					sectionId,
					userId: createdBy,
				};
				await ApiService.postItemWithAuth('task/team', body2);

				history.push(destination);
			}

			if (editMode) {
				await ApiService.updateItem(`tasks/${taskId}`, body);
				setTask(body);

				this.props.handleClose();
			}
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		return (
			<>
				<RenderCreateTask
					state={this.state}
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					handleDisabled={this.handleDisabled}
					handleError={this.handleError}
				/>
			</>
		);
	}
}

export default CreateSection;
