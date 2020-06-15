import React, { Component } from 'react';
import TimeService from '../../../services/time-service';
import TaskContext from '../../../context/TaskContext';

export class RenderTaskDetails extends Component {
	static contextType = TaskContext;
	renderTaskDetails = () => {
		const { task } = this.context;
		return (
			<>
				<main className='task-details'>
					<div className='task-details-header'>
						<div className='task-details-icons'>
							<i
								className=' back-icon'
								onClick={() => this.props.history.goBack()}
							>
								<i className='fas fa-arrow-alt-circle-left'></i>
							</i>
							<h2 className='h2-section'>Task Details</h2>
						</div>

						<div className='task-details-btn'>
							<button
								className='nav-btn'
								name='assign'
								onClick={(e) => this.props.handleClick(e)}
							>
								Asign
							</button>
							<button
								className='nav-btn'
								name='team'
								onClick={(e) => this.props.handleClick(e)}
							>
								Team
							</button>
							<button
								className='nav-btn'
								name='editTask'
								onClick={(e) => this.props.handleClick(e)}
							>
								Edit
							</button>
							<button
								className='nav-btn'
								name='deleteTask'
								onClick={(e) => this.props.handleClick(e)}
							>
								Delete
							</button>
							<button
								className='nav-btn logout-btn'
								name='loggedOut'
								onClick={() => this.props.logOut()}
							>
								log out
							</button>
						</div>
					</div>

					<div className='task-details-main'>
						<p className='due'>
							<span className='title'>Due Date </span>
							{TimeService.formatDate(task.dueDate)}
						</p>
						<p className='task-description'>{task.description}</p>

						<label htmlFor='completed' className='checkbox'>
							<input
								type='checkbox'
								name='completed'
								id='completed'
								value={this.props.completed}
								checked={this.props.isChecked()}
								onChange={this.props.handleChange}
							/>
							<span>Completed</span>
						</label>
					</div>
					{this.props.showModal(task)}
				</main>
			</>
		);
	};

	render() {
		return <>{this.renderTaskDetails()}</>;
	}
}

export default RenderTaskDetails;
