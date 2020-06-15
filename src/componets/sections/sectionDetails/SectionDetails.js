import React, { Component } from 'react';
import SectionsContext from '../../../context/SectionsContext';
import ApiService from '../../../services/api-service';
import FindUser from '../../users/FindUser';
import TeamMembers from '../../teams/TeamMembers';
import DeletPage from '../../layouts/DeletePage';
import EditSection from '../EditSection';
import RenderSectionDetails from './RenderSectionDetails';

export class SectionDetails extends Component {
	static contextType = SectionsContext;

	state = {
		assign: false,
		team: false,
		deleteItem: false,
		edit: false,
		id: '',
		teamMembers: [],
	};

	componentDidMount() {
		const { sectionId } = this.props.match.params;
		try {
			this.setState({ id: Number(sectionId) });
			ApiService.getItem('sections', sectionId).then((section) => {
				this.context.setSection(section);
			});
		} catch (err) {
			console.log(err);
		}
	}

	handleClick = (e) => {
		this.setState({ [e.target.name]: true });
		this.fetchTeamMembers(this.state.id);
	};

	handleClose = (e) => {
		this.setState({
			assign: false,
			team: false,
			deleteItem: false,
			edit: false,
		});
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
		const { assign, team, deleteItem, teamMembers, edit } = this.state;

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

		if (deleteItem) {
			return (
				<DeletPage
					handleClose={this.handleClose}
					name={section.sectionName}
					description={section.description}
					id={id}
					endPoint={`sections/${id}`}
					pageName={'Delete Section'}
					goBack={() => this.goBack(section.projectId)}
					open={deleteItem}
				/>
			);
		}

		if (edit) {
			return (
				<EditSection
					handleClose={this.handleClose}
					id={id}
					endPoint={`sections/${id}`}
					section={section}
					open={edit}
				/>
			);
		}
	};

	render() {
		return (
			<>
				<RenderSectionDetails
					handleClick={this.handleClick}
					history={this.props.history}
					showModal={this.showModal}
					sectionId={this.props.match.params.sectionId}
				/>
			</>
		);
	}
}

export default SectionDetails;
