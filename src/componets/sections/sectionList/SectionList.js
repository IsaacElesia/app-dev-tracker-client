import React, { Component } from 'react';
import ApiService from '../../../services/api-service';
import SectionsContext from '../../../context/SectionsContext';
import FindUser from '../../users/FindUser';
import TeamMembers from '../../teams/TeamMembers';
import DeletPage from '../../layouts/DeletePage';
import RenderSectionList from './RenderSectionList';

export class SectionList extends Component {
	static contextType = SectionsContext;

	state = {
		assign: false,
		team: false,
		deleteSection: false,
		id: '',
		teamMembers: [],
	};

	componentDidMount() {
		try {
			this.fetchSections().then((sections) => this.filterSections(sections));
		} catch (err) {
			console.log(err);
		}
	}

	fetchSections = () => {
		return ApiService.getItems('sections').then((sections) => {
			return sections;
		});
	};

	filterSections = (sections) => {
		const filterdSections = sections.filter((sec) => {
			return sec.projectId === Number(this.props.projectId);
		});

		this.context.setSections(filterdSections);
	};

	handleClick = (e, id) => {
		this.setState({ [e.target.name]: true, id });
		this.fetchTeamMembers(id);
	};

	handleClose = (e) => {
		this.setState({ assign: false, team: false, deleteSection: false });
	};

	fetchTeamMembers = async (id) => {
		const members = await ApiService.getItems(`section/team?sectionid=${id}`);
		this.setState({ teamMembers: members });
	};

	goBack = (projectId) => {
		const { history } = this.props;
		const destination = `/projects/${projectId}`;
		history.push(destination);
	};

	showModal = (id, section) => {
		if (this.state.id === id) {
			const { assign, team, deleteSection, teamMembers } = this.state;

			if (assign) {
				return (
					<FindUser
						handleClose={this.handleClose}
						sectionId={id}
						projectId={section.projectId}
						endpoint={'section/team'}
						open={assign}
					/>
				);
			}
			if (team && teamMembers.length > 0) {
				return (
					<TeamMembers
						handleClose={this.handleClose}
						members={teamMembers}
						teamId={'sectionTeamId'}
						team={'Section Team'}
						open={team}
					/>
				);
			}

			if (deleteSection) {
				return (
					<DeletPage
						handleClose={this.handleClose}
						name={section.sectionName}
						description={section.description}
						id={id}
						endPoint={`sections/${id}`}
						pageName={'Delete Section'}
						goBack={() => this.goBack(section.projectId)}
						open={deleteSection}
					/>
				);
			}
		}
	};

	render() {
		return (
			<>
				<RenderSectionList
					handleClick={this.handleClick}
					context={this.context}
					showModal={this.showModal}
				/>
			</>
		);
	}
}

export default SectionList;
