import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TimeService from '../../../services/time-service';
import TaskContext from '../../../context/TaskContext';

export class RenderTaskList extends Component {
	static contextType = TaskContext;
	renderTasks = () => {
		const { tasks, filterdTask } = this.context;
		let taskToRender = [];

		if (filterdTask === 'completed') {
			tasks.forEach((task) => {
				if (task.completed) {
					taskToRender.push(task);
				}
			});
		} else if (filterdTask === 'undone') {
			tasks.forEach((task) => {
				if (!task.completed) {
					taskToRender.push(task);
				}
			});
		} else {
			taskToRender = tasks;
		}

		return taskToRender.map((task) => {
			return (
				<div className='card' key={task.taskId}>
					<div className='card-project'>
						<div
							className={`status ${
								TimeService.dueTime(task.dueDate, task.completed).class
							}`}
						>
							<p>{TimeService.dueTime(task.dueDate, task.completed).status}</p>
						</div>
						<div className='card-details'>
							<Link to={`/tasks/${task.taskId}`}>
								<p className='task'>{task.description}</p>
								<p className='due'>
									<span className='title'>Due Date</span>{' '}
									{TimeService.formatDate(task.dueDate)}
								</p>
							</Link>
							<div className='actions'>
								<div className='member'>
									<button
										className='btn-assign'
										name='assign'
										onClick={(e) => this.props.handleClick(e, task.taskId)}
									>
										Assign
									</button>
									<button
										className='btn-team'
										name='team'
										onClick={(e) => this.props.handleClick(e, task.taskId)}
									>
										Team
									</button>
								</div>
								<div className='modify'>
									<button
										className='btn-delete'
										name='deleteTask'
										onClick={(e) => this.props.handleClick(e, task.taskId)}
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					</div>
					{this.props.showModal(task.taskId, task)}
				</div>
			);
		});
	};
	render() {
		return <>{this.renderTasks()}</>;
	}
}

export default RenderTaskList;
