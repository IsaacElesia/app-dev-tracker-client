import React, { Component } from 'react';

const TaskContext = React.createContext({
	tasks: [],
	task: {},
	filterdTask: 'all',
});
export default TaskContext;

export class TaskProvider extends Component {
	state = {
		tasks: [],
		task: {},
		filterdTask: 'all',
	};

	setTasks = (tasks) => {
		this.setState({ tasks });
	};

	setTask = (task) => {
		this.setState({ task });
	};

	setFilterdTask = (filterdTask) => {
		this.setState({ filterdTask });
	};

	render() {
		const value = {
			tasks: this.state.tasks,
			setTasks: this.setTasks,
			task: this.state.task,
			setTask: this.setTask,
			filterdTask: this.state.filterdTask,
			setFilterdTask: this.setFilterdTask,
		};
		return (
			<TaskContext.Provider value={value}>
				{this.props.children}
			</TaskContext.Provider>
		);
	}
}
