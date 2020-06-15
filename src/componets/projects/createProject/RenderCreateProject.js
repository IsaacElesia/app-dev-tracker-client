import React, { Component } from 'react';

export class RenderCreateProject extends Component {
	render() {
		return (
			<main className='reg'>
				<div className='reg-form-header'>
					<div className='page-nav-icons'>
						<i className=' back-icon' onClick={() => this.props.goBack()}>
							<i className='fas fa-arrow-alt-circle-left'></i>
						</i>
						<h2 className='h2-section'>
							{this.props.state.editMode ? 'Update Project' : 'New Project'}{' '}
						</h2>
					</div>
				</div>
				<form className='reg-form' onSubmit={this.props.handleSubmit}>
					<fieldset className='form-group'>
						<label htmlFor='projectName' className='reg-form-label'>
							Name
						</label>
						<input
							type='text'
							name='projectName'
							id='projectName'
							placeholder='Project name'
							required
							className='reg-form-input'
							onChange={this.props.handleChange}
							value={this.props.state.projectName}
						/>
						{this.props.state.projectNameTouch &&
							this.props.handleError('projectName')}
						<label htmlFor='projectRepo' className='reg-form-label'>
							Project Repository
						</label>
						<input
							type='text'
							name='projectRepo'
							id='projectRepo'
							placeholder='https://github.com/userName/projectRepo'
							className='reg-form-input'
							value={this.props.state.projectRepo}
							onChange={this.props.handleChange}
						/>

						<label htmlFor='startDate' className='reg-form-label'>
							Start Date
						</label>
						<input
							type='date'
							name='startDate'
							id='startDate'
							value={this.props.state.startDate}
							placeholder='MM/DD/YYYY'
							className='reg-form-input'
							onChange={this.props.handleChange}
						/>
						<label htmlFor='dueDate' className='reg-form-label'>
							Due date
						</label>
						<input
							type='date'
							name='dueDate'
							id='dueDate'
							required
							value={this.props.state.dueDate}
							placeholder='MM/DD/YYYY'
							className='reg-form-input'
							onChange={this.props.handleChange}
						/>
						{this.props.state.dueDateTouch && this.props.handleError('dueDate')}
						<label htmlFor='description' className='reg-form-label'>
							Description
						</label>
						<textarea
							name='description'
							id='description'
							className='description'
							value={this.props.state.description}
							onChange={this.props.handleChange}
						></textarea>
					</fieldset>
					<button
						type='submit'
						className='btn-submit'
						disabled={this.props.handleDisabled()}
					>
						{this.props.state.editMode ? 'Update' : 'Create'}
					</button>
				</form>
			</main>
		);
	}
}

export default RenderCreateProject;
