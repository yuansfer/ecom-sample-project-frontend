import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';

class ErrorModal extends Component {

	_onHide = (params) => {
		this.props._onHide(params)
	}

	render() {

		return (
			<>
				<Modal show={this.props.showError}
					onHide={() => this._onHide({ showError: false, isSubmitting: false })}
					aria-labelledby="contained-modal-title-vcenter"
					centered>
					<Modal.Header closeButton>
						<Modal.Title>{this.props.title || 'Error'}</Modal.Title>
					</Modal.Header>
					<Modal.Body>{this.props.body}</Modal.Body>
				</Modal>
			</>
		)
	}
}

export default ErrorModal;