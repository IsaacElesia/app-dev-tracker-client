import React, { Component } from 'react';
import ApiService from '../../services/api-service';
import TokenService from '../../services/token-service';
import UsersContext from '../../context/UsersContext';

export class Login extends Component {
	static contextType = UsersContext;
	state = { email: '', password: '' };

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = async (e) => {
		try {
			e.preventDefault();

			const { location, history } = this.props;
			const destination = (location.state || {}).from || '/dashboard';
			const body = {
				email: this.state.email,
				password: this.state.password,
			};

			const result = await ApiService.login(body);
			TokenService.saveAuthToken(result.token);

			this.setState({ email: '', password: '' });

			history.push(destination);
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		return (
			<div>
				<main className='reg'>
					<div className='reg-form-header'>
						<div className='page-nav-icons'>
							<i
								className=' back-icon'
								onClick={() => this.props.history.push('/')}
							>
								<i className='fas fa-arrow-alt-circle-left'></i>
							</i>
							<h2 className='h2-section'>log in</h2>
						</div>
					</div>
					<form className='reg-form' onSubmit={this.handleSubmit}>
						<fieldset className='form-group'>
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
						</fieldset>
						<button type='submit' className='btn-submit'>
							Login
						</button>
					</form>
				</main>
			</div>
		);
	}
}

export default Login;
