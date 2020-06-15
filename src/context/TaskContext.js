import React, { Component } from 'react';

const TaskContext = React.createContext({
	tasks: [],
	task: {},
	completed: false,
});
export default TaskContext;

export class TaskProvider extends Component {
	state = {
		tasks: [],
		task: {},
		completed: false,
	};

	setTasks = (tasks) => {
		this.setState({ tasks });
	};

	setTask = (task) => {
		this.setState({ task });
	};

	setCompleted = (completed) => {
		this.setState({ completed });
	};

	render() {
		const value = {
			tasks: this.state.tasks,
			setTasks: this.setTasks,
			task: this.state.task,
			setTask: this.setTask,
			completed: this.state.completed,
			setCompleted: this.setCompleted,
		};
		return (
			<TaskContext.Provider value={value}>
				{this.props.children}
			</TaskContext.Provider>
		);
	}
}
