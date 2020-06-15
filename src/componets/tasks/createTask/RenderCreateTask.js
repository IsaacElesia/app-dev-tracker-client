import React, { Component } from 'react';

export class RenderCreateTask extends Component {
	render() {
		const {
			dueDate,
			description,
			descriptionTouch,
			dueDateTouch,
			editMode,
		} = this.props.state;
		return (
			<main className='reg'>
				<div className='reg-form-header'>
					<div className='page-nav-icons'>
						<i className=' back-icon' onClick={() => this.goBack()}>
							<i className='fas fa-arrow-alt-circle-left'></i>
						</i>
						<h2 className='h2-section'>
							{editMode ? 'Update Task' : 'Add Task'}{' '}
						</h2>
					</div>
				</div>
				<form className='reg-form' onSubmit={this.props.handleSubmit}>
					<fieldset className='form-group'>
						<label htmlFor='dueDate' className='reg-form-label'>
							Due date
						</label>
						<input
							type='date'
							name='dueDate'
							id='dueDate'
							value={dueDate}
							placeholder='MM/DD/YYYY'
							required
							className='reg-form-input'
							onChange={this.props.handleChange}
						/>
						{dueDateTouch && this.props.handleError('dueDate')}

						<label htmlFor='description' className='reg-form-label'>
							Description
						</label>
						<textarea
							name='description'
							id='description'
							className='description'
							value={description}
							onChange={this.props.handleChange}
						></textarea>
						{descriptionTouch && this.props.handleError('description')}
					</fieldset>

					<button
						type='submit'
						className='btn-submit'
						disabled={this.props.handleDisabled()}
					>
						{editMode ? 'Update' : 'Add'}
					</button>
				</form>
			</main>
		);
	}
}

export default RenderCreateTask;
