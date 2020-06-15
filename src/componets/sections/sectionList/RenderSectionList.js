import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import TimeService from '../../../services/time-service';

export class RenderSectionList extends Component {
	renderSections = () => {
		const { sections } = this.props.context;

		return sections.map((section) => {
			return (
				<div className='card' key={section.sectionId}>
					<div className='card-project'>
						<div
							className={`status ${TimeService.dueTime(section.dueDate).class}`}
						>
							<p>{TimeService.dueTime(section.dueDate).status}</p>
						</div>
						<div className='card-details'>
							<NavLink to={`/sections/${section.sectionId}`}>
								<img
									className='section-img'
									src='../img/login.png'
									alt='login'
								/>
								<p className='name'>{section.sectionName}</p>
								<p className='due'>
									<span className='title'>Due Date</span>{' '}
									{TimeService.formatDate(section.dueDate)}
								</p>
							</NavLink>

							<div className='actions'>
								<div className='member'>
									<button
										className='btn-assign'
										name='assign'
										onClick={(e) =>
											this.props.handleClick(e, section.sectionId)
										}
									>
										Assign
									</button>
									<button
										className='btn-team'
										name='team'
										onClick={(e) =>
											this.props.handleClick(e, section.sectionId)
										}
									>
										Team
									</button>
								</div>
								<div className='modify'>
									<button
										className='btn-delete'
										name='deleteSection'
										onClick={(e) =>
											this.props.handleClick(e, section.sectionId)
										}
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					</div>
					{this.props.showModal(section.sectionId, section)}
				</div>
			);
		});
	};

	render() {
		return <>{this.renderSections()}</>;
	}
}

export default RenderSectionList;
