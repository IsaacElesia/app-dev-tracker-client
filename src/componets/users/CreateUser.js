import React, { Component } from 'react';
import ApiService from '../../services/api-service';
import TokenService from '../../services/token-service';

export class CreateUser extends Component {
	state = {
		fullName: '',
		email: '',
		github: '',
		password: '',
		password2: '',
		fullNameTouch: false,
		emailTouch: false,
		passwordTouch: false,
		password2Touch: false,
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });

		switch (e.target.name) {
			case 'fullName':
				return this.setState({ fullNameTouch: true });
			case 'email':
				return this.setState({ emailTouch: true });
			case 'password':
				return this.setState({ passwordTouch: true });
			case 'password2':
				return this.setState({ password2Touch: true });
			default:
				return this.state;
		}
	};

	handleDisabled = () => {
		if (
			this.state.fullName.length < 2 ||
			!this.state.email.includes('@') ||
			this.state.password.length < 6 ||
			this.state.password2.length < 6 ||
			this.state.password !== this.state.password2
		) {
			return true;
		}
	};

	handleError = (value) => {
		switch (value) {
			case 'fullName':
				return this.state.fullName.length < 2 ? (
					<p>Name must be more than one character.</p>
				) : (
					''
				);
			case 'email':
				return !this.state.email.includes('@') ? (
					<p>Input a valid email </p>
				) : (
					''
				);
			case 'password':
				return this.state.password.length < 6 ? (
					<p>Password must be more than 5 characters.</p>
				) : (
					''
				);
			case 'password2':
				return this.state.password !== this.state.password2 ? (
					<p>Your confirmation password must match with your password </p>
				) : (
					''
				);
			default:
				return '';
		}
	};

	handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { fullName, email, github, password, password2 } = this.state;
			if (password !== password2) {
				return 'Password and confirm password must be the same.';
			}
			const { history } = this.props;
			const destination = '/dashboard';
			const body = {
				fullName,
				email,
				github,
				password,
				password2,
			};
			const result = await ApiService.postItem('users', body);
			TokenService.saveAuthToken(result.token);

			this.setState({
				fullName: '',
				email: '',
				github: '',
				password: '',
				password2: '',
			});

			history.push(destination);
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		return (
			<main className='reg'>
				<div className='reg-form-header'>
					<div className='page-nav-icons'>
						<i
							className=' back-icon'
							onClick={() => this.props.history.push('/')}
						>
							<i className='fas fa-arrow-alt-circle-left'></i>
						</i>
						<h2 className='h2-section'>New User</h2>
					</div>
				</div>
				<form className='reg-form' onSubmit={this.handleSubmit}>
					<fieldset className='form-group'>
						<label htmlFor='fullName' className='reg-form-label'>
							Full name
						</label>
						<input
							type='text'
							name='fullName'
							id='fullName'
							placeholder='First and last name'
							required
							className='reg-form-input'
							onChange={this.handleChange}
						/>
						{this.state.nameTouch && this.handleError('name')}
						<label htmlFor='email' className='reg-form-label'>
							Email
						</label>
						<input
							type='email'
							name='email'
							id='email'
							placeholder='example@gmail.com'
							required
							className='reg-form-input'
							onChange={this.handleChange}
						/>
						{this.state.emailTouch && this.handleError('email')}
						<label htmlFor='github' className='reg-form-label'>
							Github
						</label>
						<input
							type='text'
							name='github'
							id='github'
							placeholder='https://github.com/your-github-handle'
							className='reg-form-input'
							onChange={this.handleChange}
						/>
						<label htmlFor='password' className='reg-form-label'>
							Password
						</label>
						<input
							type='password'
							name='password'
							id='password'
							placeholder='password'
							required
							className='reg-form-input'
							onChange={this.handleChange}
						/>
						{this.state.passwordTouch && this.handleError('password')}
						<label htmlFor='password2' className='reg-form-label'>
							Confirm password
						</label>
						<input
							type='password'
							name='password2'
							id='password2'
							placeholder='Confirmation password'
							required
							className='reg-form-input'
							onChange={this.handleChange}
						/>
						{this.state.password2Touch && this.handleError('password2')}
					</fieldset>
					<button
						type='submit'
						className='btn-submit'
						disabled={this.handleDisabled()}
					>
						Register
					</button>
				</form>
			</main>
		);
	}
}

export default CreateUser;
