import React, { Component } from 'react';
import CreateProject from './createProject/CreateProject';
import Modal from '../modal/Modal';

export class EditProject extends Component {
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

	render() {
		return (
			<Modal handleClose={this.props.handleClose}>
				<CreateProject
					project={this.props.project}
					handleClose={this.props.handleClose}
				/>
			</Modal>
		);
	}
}

export default EditProject;
