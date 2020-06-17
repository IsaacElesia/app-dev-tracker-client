import React, { Component } from 'react';
import TimeService from '../../../services/time-service';
import TaskContext from '../../../context/TaskContext';
import MainNav from '../../layouts/MainNav';

export class RenderTaskDetails extends Component {
	static contextType = TaskContext;
	renderTaskDetails = () => {
		const { task } = this.context;
		return (
			<>
				<main className='task-details'>
					<MainNav
						name={'Task details'}
						history={this.props.history}
						destination={`/sections/${task.sectionId}`}
						handleClick={this.props.handleClick}
						taskClass={'task-details-header'}
					/>

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
