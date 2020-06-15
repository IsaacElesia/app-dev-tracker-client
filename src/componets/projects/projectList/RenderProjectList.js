import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import TimeService from '../../../services/time-service';

export class RenderProjectList extends Component {
	renderProjects = () => {
		const { projects } = this.props.context;
		return projects.map((project) => {
			return (
				<div className='card' key={project.projectId}>
					<div className='card-project'>
						<div
							className={`status ${TimeService.dueTime(project.dueDate).class}`}
						>
							<p>{TimeService.dueTime(project.dueDate).status}</p>
						</div>
						<div className='card-details'>
							<NavLink to={`/projects/${project.projectId}`}>
								<p className='name'>{project.projectName}</p>
								<p className='due'>
									<span className='title'>Due Date</span>{' '}
									{TimeService.formatDate(project.dueDate)}
								</p>
							</NavLink>
							<div className='actions'>
								<div className='member'>
									<button
										className='btn-assign'
										name='assign'
										onClick={(e) =>
											this.props.handleClick(e, project.projectId)
										}
									>
										Assign
									</button>
									<button
										className='btn-team'
										name='team'
										onClick={(e) =>
											this.props.handleClick(e, project.projectId)
										}
									>
										Team
									</button>
								</div>
								<div className='modify'>
									<button
										className='btn-delete'
										name='deleteProject'
										onClick={(e) =>
											this.props.handleClick(e, project.projectId)
										}
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					</div>
					{this.props.showModal(project.projectId, project)}
				</div>
			);
		});
	};

	render() {
		return <div>{this.renderProjects()}</div>;
	}
}

export default RenderProjectList;
