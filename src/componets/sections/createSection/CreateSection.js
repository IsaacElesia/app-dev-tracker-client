import React, { Component } from 'react';
import SectionContext from '../../../context/SectionsContext';
import moment from 'moment';
import ApiService from '../../../services/api-service';
import TokenService from '../../../services/token-service';
import RenderCreateSection from './RenderCreateSection';

export class CreateSection extends Component {
	static contextType = SectionContext;
	state = {
		sectionId: '',
		projectId: '',
		sectionName: '',
		startDate: `${moment().format('ddd MMM DD YYYY HH:mm:ss')}`,
		dueDate: '',
		description: '',
		imgUrl: '',
		completed: false,
		createdBy: '',
		sectionNameTouch: false,
		dueDateTouch: false,
		editMode: false,
	};

	componentDidMount() {
		const { section } = this.props;
		if (section) {
			this.setState({
				sectionId: section.sectionId,
				projectId: section.projectId,
				sectionName: section.sectionName,
				startDate: `${moment(section.startDate).format('YYYY-MM-DD')}`,
				dueDate: `${moment(section.dueDate).format('YYYY-MM-DD')}`,
				description: section.description,
				imgUrl: section.imgUrl,
				completed: section.completed,
				createdBy: section.createdBy,
				editMode: true,
			});
		}
	}

	handleChange = (e) => {
		let time, m;

		if (!this.state.projectId) {
			const { projectId } = this.props.match.params;
			this.setState({ projectId });
		}

		if (!this.state.createdBy)
			this.setState({ createdBy: TokenService.readJwtToken().user.id });

		switch (e.target.name) {
			case 'sectionName':
				this.setState({ sectionName: e.target.value });
				return this.setState({ sectionNameTouch: true });
			case 'dueDate':
				time = e.target.value;
				m = moment(time).format('YYYY-MM-DD');
				return this.setState({ dueDate: `${m}`, dueDateTouch: true });
			case 'startDate':
				time = e.target.value;
				m = moment(time).format('YYYY-MM-DD');
				return this.setState({ startDate: `${m}` });
			default:
				return this.setState({ [e.target.name]: e.target.value });
		}
	};

	handleDisabled = () => {
		if (this.state.sectionName.length < 2 || this.state.dueDate.length < 6) {
			return true;
		}
	};

	handleError = (value) => {
		switch (value) {
			case 'sectionName':
				return this.state.sectionName.length < 2 ? (
					<p>Section name must be more than one character.</p>
				) : (
					''
				);
			case 'dueDate':
				return this.state.dueDate.length < 6 ? <p>Iput a valid date</p> : '';
			default:
				return '';
		}
	};

	goBack = () => {
		if (!this.state.editMode) {
			const destination = `/projects/${this.props.match.params.projectId}`;
			this.props.history.push(destination);
		} else {
			this.props.handleClose();
		}
	};

	handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { setSection } = this.context;
			const {
				sectionId,
				projectId,
				sectionName,
				startDate,
				dueDate,
				description,
				imgUrl,
				completed,
				createdBy,
				editMode,
			} = this.state;

			const { history } = this.props;
			const destination = `/projects/${projectId}`;
			const body = {
				sectionId,
				projectId,
				sectionName,
				startDate: `${moment(startDate).format('ddd MMM DD YYYY')}`,
				dueDate: `${moment(dueDate).format('ddd MMM DD YYYY')}`,
				description,
				imgUrl,
				completed,
				createdBy,
			};

			if (!editMode) {
				const section = await ApiService.postItemWithAuth('sections', body);
				const body2 = {
					projectId,
					sectionId: section.sectionId,
					userId: createdBy,
				};
				await ApiService.postItemWithAuth('section/team', body2);
				history.push(destination);
			}

			if (editMode) {
				await ApiService.updateItem(`sections/${sectionId}`, body);
				setSection(body);

				this.props.handleClose();
			}
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		return (
			<>
				<RenderCreateSection
					state={this.state}
					handleSubmit={this.handleSubmit}
					handleError={this.handleError}
					handleChange={this.handleChange}
					handleDisabled={this.handleDisabled}
					goBack={this.goBack}
				/>
			</>
		);
		/* 	return (
			<main className='reg'>
				<div className='reg-form-header'>
					<div className='page-nav-icons'>
						<i className=' back-icon' onClick={() => this.goBack()}>
							<i className='fas fa-arrow-alt-circle-left'></i>
						</i>
						<h2 className='h2-section'>
							{this.state.editMode ? 'Update Section' : 'New Section'}{' '}
						</h2>
					</div>
				</div>
				<form className='reg-form' onSubmit={this.handleSubmit}>
					<fieldset className='form-group'>
						<label htmlFor='sectionName' className='reg-form-label'>
							Name
						</label>
						<input
							type='text'
							name='sectionName'
							id='sectionName'
							placeholder='Section name'
							required
							className='reg-form-input'
							value={this.state.sectionName}
							onChange={this.handleChange}
						/>
						{this.state.sectionNameTouch && this.handleError('sectionName')}

						<label htmlFor='dueDate' className='reg-form-label'>
							Due date
						</label>
						<input
							type='date'
							name='dueDate'
							id='dueDate'
							value={this.state.dueDate}
							placeholder='MM/DD/YYYY'
							required
							className='reg-form-input'
							onChange={this.handleChange}
						/>
						{this.state.dueDateTouch && this.handleError('dueDate')}
						<label htmlFor='Wireframe Image' className='reg-form-label'>
							Wireframe
						</label>
						<input
							type='file'
							name='wireframe'
							id='wireframe'
							accept='image/*'
						/>
						<label htmlFor='description' className='reg-form-label'>
							Description
						</label>
						<textarea
							name='description'
							id='description'
							value={this.state.description}
							className='description'
							onChange={this.handleChange}
						></textarea>
					</fieldset>

					<button
						type='submit'
						className='btn-submit'
						disabled={this.handleDisabled()}
					>
						{this.state.editMode ? 'Update' : 'Create'}
					</button>
				</form>
			</main>
		); */
	}
}

export default CreateSection;
