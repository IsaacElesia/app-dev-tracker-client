import React, { Component } from 'react';
import Modal from '../modal/Modal';

export class TeamMembers extends Component {
	state = {
		windowOffset: 0,
	};

	componentDidMount() {
		if (this.props.open) {
			this.setState({ windowOffset: window.scrollY });
			document.body.setAttribute(
				'style',
				`position: fixed; top: ${this.windowOffset}px; left:0; right:0;`
			);
		}
	}

	componentWillUnmount() {
		document.body.setAttribute('style', '');
		window.scrollTo(0, this.state.windowOffset);
	}

	renderMembers() {
		const { teamId, members } = this.props;

		return members.map((member) => {
			return (
				<div className='card' key={member[teamId]}>
					<div className='card-project'>
						<div className='card-details user'>
							<p className='user-name'>{member.name}</p>
							<p className='user-email'>{member.email}</p>
						</div>
					</div>
				</div>
			);
		});
	}

	render() {
		return (
			<Modal handleClose={this.props.handleClose}>
				<h3 className='h3-team'>{this.props.team} Members</h3>
				{this.renderMembers()}
			</Modal>
		);
	}
}

export default TeamMembers;
