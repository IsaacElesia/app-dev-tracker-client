import React, { Component } from 'react';
import Modal from '../modal/Modal';
import ApiService from '../../services/api-service';

export class DeletePage extends Component {
	state = {
		windowOffset: 0,
	};

	componentDidMount() {
		if (this.props.open) {
			this.setState({ windowOffset: window.scrollY });
			document.body.setAttribute(
				'style',
				`position: fixed; top: ${this.windowOffset}; left:0; right:0;`
			);
		}
	}

	componentWillUnmount() {
		document.body.setAttribute('style', '');
		window.scrollTo(0, this.state.windowOffset);
	}

	deleteItem = (endpoint) => {
		ApiService.deleteItem(endpoint).then((res) => {
			this.props.handleClose();
			this.props.goBack();
		});
	};

	renderDelete = () => {
		const { pageName, name, endPoint, description } = this.props;

		return (
			<>
				<h1 className='h1-delete'>{pageName}</h1>
				<h3 className='h3'>{name}</h3>
				{description && <p className='p-delete'>{description}</p>}

				<div className='btn-modal'>
					<button
						className='btn-delete delete'
						onClick={() => this.deleteItem(endPoint)}
					>
						Delete
					</button>
					<button
						className='btn-delete'
						onClick={() => this.props.handleClose()}
					>
						Cancel
					</button>
				</div>
			</>
		);
	};

	render() {
		return (
			<Modal handleClose={this.props.handleClose}> {this.renderDelete()}</Modal>
		);
	}
}

export default DeletePage;
