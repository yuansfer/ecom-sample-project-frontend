import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';

class ErrorModal extends Component {

	constructor(props) {
		super(props);

	}

	_onHide = (params) => {
		this.props._onHide(params)
	}

	render() {

		return (
			<>
				<Modal show={this.props.error_modal}
					//onHide={() => this._onHide({ error_modal: false, isRefundLoading: false, isCancelLoading: false })}
					onHide={() => this._onHide({ error_modal: false })}
					aria-labelledby="contained-modal-title-vcenter"
					centered closeButton>
					<Modal.Header>
						<Modal.Title>{this.props.error_modal_title}</Modal.Title>
					</Modal.Header>
					<Modal.Body>{this.props.error_modal_body}</Modal.Body>
				</Modal>
			</>
		)
	}
}

export default ErrorModal;