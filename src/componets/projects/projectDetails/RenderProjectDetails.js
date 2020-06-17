import React, { Component } from 'react';
import ProjectsContext from '../../../context/ProjectsContext';
import SectionsContext from '../../../context/SectionsContext';
import MainNav from '../../layouts/MainNav';
import SecondaryNav from '../../layouts/SecondaryNav';
import SectionList from '../../sections/sectionList/SectionList';

export class RenderProjectDetails extends Component {
	static contextType = ProjectsContext;
	renderProject = () => {
		const { project } = this.context;

		return (
			<>
				<MainNav
					name={'project details'}
					history={this.props.history}
					destination={'/dashboard'}
					handleClick={this.props.handleClick}
				/>
				<main className='page no-scroll'>
					<section className='description'>
						<h1 className='h1'>{project.projectName}</h1>
						<h3 className='h3'>description</h3>
						<p>{project.description}</p>
					</section>

					<section className='page-main'>
						{
							<SectionsContext.Consumer>
								{({ setFilterdSections }) => (
									<SecondaryNav
										page={'Section'}
										link1={`/newsection/${project.projectId}`}
										setContext={setFilterdSections}
									/>
								)}
							</SectionsContext.Consumer>
						}
						{
							<SectionList
								projectId={this.props.projectId}
								history={this.props.history}
							/>
						}
					</section>
				</main>
				{this.props.showModal(project.projectId, project)}
			</>
		);
	};

	render() {
		return <>{this.renderProject()}</>;
	}
}

export default RenderProjectDetails;
