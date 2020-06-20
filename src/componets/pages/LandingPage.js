import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';

export class LandingPage extends Component {
	state = {
		loggedIn: false,
	};

	componentDidMount() {
		if (TokenService.hasAuthToken()) {
			this.setState({ loggedIn: true });
		}
	}

	loogOut = () => {
		TokenService.clearAuthToken();
		this.setState({ loggedIn: false });
	};

	callToAction = () => {
		if (this.state.loggedIn) {
			return (
				<div className='call-to-action'>
					<div className='btn-action'>
						<Link to='/dashboard'>dashboard</Link>
					</div>
					<div className='btn-action'>
						<button onClick={this.loogOut}>log out</button>
					</div>
				</div>
			);
		} else {
			return (
				<div className='call-to-action'>
					<div className='btn-action'>
						<Link to='/user/createuser'>signUp</Link>
					</div>
					<div className='btn-action'>
						<Link to='/login'>login</Link>
					</div>
				</div>
			);
		}
	};

	render() {
		return (
			<div>
				<main className='wrapper'>
					<section className='banner'>
						<div className='image'>
							<img src='/img/app-pics/logo.png' alt='the App' />
						</div>

						<div className='content'>
							<p>
								App Dev Tracker gives you the power to organize and plan your
								project. It also gives you the ability to track your progress
								while developing an app.
							</p>

							{this.callToAction()}
						</div>
					</section>

					<section className='app-use'>
						<div className='image'>
							<img src='/img/app-pics/dashboard.jpg' alt='dashboard' />
						</div>

						<div className='content'>
							<h2 className='h2-landing'>Dashboard</h2>
							<p>
								The dashboard shows you all the projects you are involved in and
								their status. It also gives you the ability to filter your
								projects according to their time status (late, past-due,
								on-time, and completed).
							</p>
						</div>
					</section>

					<section className='app-use reverse'>
						<div className='image'>
							<img
								src='/img/app-pics/projectsDetails.jpg'
								alt='project details'
							/>
						</div>

						<div className='content'>
							<h2 className='h2-landing'>Project Details</h2>
							<p>
								On the project detail page, you get to see the project
								description and all the sections that make up the project. You
								can also see the status of each section, that is whether it is
								late, past-due, on-time, or completed.
							</p>
						</div>
					</section>

					<section className='app-use'>
						<div className='image'>
							<img
								src='/img/app-pics/sectionDetails.jpg'
								alt='section details'
							/>
						</div>

						<div className='content'>
							<h2 className='h2-landing'>Section details</h2>
							<p>
								The section detail page displays its description, picture, and
								all the task to get done in other to complete that section of
								the project.
							</p>
						</div>
					</section>

					<section className='app-use reverse'>
						<div className='image'>
							<img src='/img/app-pics/taskDetails.jpg' alt='task details' />
						</div>

						<div className='content'>
							<h2 className='h2-landing'>Task Details</h2>
							<p>
								On the task detail page, a description of the task is shown, and
								you have the ability to mark the task completed once it is done.
							</p>
						</div>
					</section>
				</main>
			</div>
		);
	}
}

export default LandingPage;
