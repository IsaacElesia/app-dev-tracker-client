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
		projectId: '',
		sectionLenght: 0,
		numCompleted: 0,
	};

	componentDidMount() {
		try {
			this.fetchSections().then((sections) => this.filterSections(sections));
		} catch (err) {
			console.log(err);
		}
	}

	updateCompleted = () => {
		const { sectionLenght, numCompleted } = this.state;
		let body = false;
		if (sectionLenght !== 0 && numCompleted !== 0) {
			if (sectionLenght === numCompleted) {
				body = true;
			}
		}

		ApiService.updateItem(`projects/${this.props.projectId}`, {
			completed: body,
		});
	};

	fetchSections = () => {
		return ApiService.getItems('sections').then((sections) => {
			return sections;
		});
	};

	filterSections = (sections) => {
		const filterdSections = sections.filter((sec) => {
			if (sec.projectId === Number(this.props.projectId) && sec.completed) {
				this.setNumCompleted();
			}
			return sec.projectId === Number(this.props.projectId);
		});

		this.setSectionLength(filterdSections.length);
		this.context.setSections(filterdSections);
	};

	setSectionLength = (length) => {
		this.setState({ sectionLenght: length });
	};

	setNumCompleted = () => {
		this.setState({ numCompleted: this.state.numCompleted + 1 });
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
		this.updateCompleted();
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
