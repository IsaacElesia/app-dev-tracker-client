import React, { Component } from 'react';

export class RenderCreateSection extends Component {
	render() {
		return (
			<main className='reg'>
				<div className='reg-form-header'>
					<div className='page-nav-icons'>
						<i className=' back-icon' onClick={() => this.props.goBack()}>
							<i className='fas fa-arrow-alt-circle-left'></i>
						</i>
						<h2 className='h2-section'>
							{this.props.state.editMode ? 'Update Section' : 'New Section'}{' '}
						</h2>
					</div>
				</div>
				<form className='reg-form' onSubmit={this.props.handleSubmit}>
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
							value={this.props.state.sectionName}
							onChange={this.props.handleChange}
						/>
						{this.props.state.sectionNameTouch &&
							this.props.handleError('sectionName')}

						<label htmlFor='dueDate' className='reg-form-label'>
							Due date
						</label>
						<input
							type='date'
							name='dueDate'
							id='dueDate'
							value={this.props.state.dueDate}
							placeholder='MM/DD/YYYY'
							required
							className='reg-form-input'
							onChange={this.props.handleChange}
						/>
						{this.props.state.dueDateTouch && this.props.handleError('dueDate')}
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
							value={this.props.state.description}
							className='description'
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

export default RenderCreateSection;
