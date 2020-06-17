import React, { Component } from 'react';
import SectionContext from '../../../context/SectionsContext';
import TaskContext from '../../../context/TaskContext';
import MainNav from '../../layouts/MainNav';
import SecondaryNav from '../../layouts/SecondaryNav';
import TaskList from '../../tasks/taskList/TaskList';

export class RenderSectionDetails extends Component {
	static contextType = SectionContext;
	renderSection = () => {
		const { section } = this.context;

		return (
			<>
				<MainNav
					name={'section details'}
					history={this.props.history}
					destination={`/projects/${section.projectId}`}
					handleClick={this.props.handleClick}
				/>

				<main className='page'>
					<section className='description'>
						<div className='img'>
							<h3 className='h3'>{section.sectionName}</h3>
							<img
								className='page-img'
								src='../img/dashboard.png'
								alt='dashboard'
							/>
						</div>
						<p>{section.description}</p>
					</section>

					<section className='page-main'>
						{
							<TaskContext>
								{({ setFilterdTask }) => {
									return (
										<SecondaryNav
											page={'Task'}
											link1={`/newtask/${section.sectionId}`}
											setContext={setFilterdTask}
										/>
									);
								}}
							</TaskContext>
						}
						{
							<TaskList
								sectionId={this.props.sectionId}
								history={this.props.history}
							/>
						}
					</section>
				</main>
				{this.props.showModal(section.sectionId, section)}
			</>
		);
	};

	render() {
		return <>{this.renderSection()}</>;
	}
}

export default RenderSectionDetails;
