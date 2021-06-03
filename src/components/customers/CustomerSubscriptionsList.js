import React, { Component } from 'react'
import { connect } from "react-redux";

import { Form, Modal } from 'react-bootstrap';
import _ from 'lodash';

import { cancelAutoPayBegin } from "../../store/payment/actions";
import { getOrdersBegin } from "../../store/order/actions";
import { _getKeyByValue } from "../../utils/helper";
import { _PAYMENT_METHODS } from "../../constants/GlobalSetting";

//import ErrorModal from '../common/ErrorModal';
class CustomerSubscriptionsList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			customerId: localStorage.getItem('customerId'),
			payments: [],
			validated: false,

			selectedCancel: [],
			cancelModal: false,
			isCancelLoading: false,

			successModal: false,
			successModalTitle: '',
			successModalBody: '',

			errorModal: false,
			errorModalTitle: '',
			errorModalBody: '',
		};

		[
			'_handleCloseCancelAutoPayModal',
			'_handleDisplayCancelAutoPayModel',
			'_cancelAutoPay',
		].map((fn) => this[fn] = this[fn].bind(this));
	}

	componentDidMount() {
		this._loadOrders()
	}

	_loadOrders() {
		const { customerId } = this.state;
		if (customerId) {
			this.props.getOrdersBegin({ customer_id: customerId, purchase_mode: 'subscribe' });
		}
	}

	componentDidUpdate(prevProps) {
		const { list, cancelAutoPay } = this.props;

		if (prevProps.list !== list) {
			const { result: { data, success } } = list;
			if (success) {

				if (data) {

					const _payments = _.map((data || []), order => {

						const { id, customer_id, customer, products, subscribe_payment, cancel_subscription } = order;
						const { purchase_mode } = products[0];

						if (purchase_mode === 'subscribe') {

							if (subscribe_payment && subscribe_payment.id) {
								const vendor = _.get(subscribe_payment, 'recurring_auth.vendor', '')
								return {
									purchase_mode: purchase_mode,
									order_id: id,
									customer_id: customer_id,
									customer_name: [_.get(customer, 'firstname', ''), _.get(customer, 'lastname', '')].join(' '),
									payment_id: subscribe_payment.id,
									vendor: vendor ? _getKeyByValue(_PAYMENT_METHODS, vendor) : '',
									allow_to_refund_or_cancel: cancel_subscription ? false : true,
									paid_amount: subscribe_payment.paid_amount,
									auto_debit_no: subscribe_payment.auto_debit_no,
								};
							}
						}
					});

					this.setState({
						payments: _payments || [],
					})
				}

			} else {
				// ERROR
			}
		}


		if (prevProps.cancelAutoPay !== cancelAutoPay) {
			const { result: { data, success, message } } = cancelAutoPay;

			if (success) {
				const { ret_code, ret_msg } = data[0]
				if (ret_code === '000100') {

					this.setState({
						cancelModal: false,
						isCancelLoading: false,
						successModal: true,
						successModalTitle: 'Cancel Subscription Success',
						successModalBody: 'Subscription cancelled successfully',
					})
				} else {

					this.setState({
						cancelModal: false,
						isCancelLoading: false,
						errorModal: true,
						errorModalTitle: 'Cancel Subscription Error',
						errorModalBody: ret_msg,
					})
				}
				this._loadOrders()
			} else {
				this.setState({
					cancelModal: false,
					isCancelLoading: false,
					errorModal: true,
					errorModalTitle: 'Cancel Subscription Error',
					errorModalBody: message,
				})
			}
		}
	}

	_handleCheck(e, p) {
		const { customer_id, order_id, auto_debit_no } = p;
		let { selectedCancel } = this.state;

		if (p.purchase_mode === 'subscribe') {
			if (e.target.checked) {
				selectedCancel.push({ customer_id: customer_id, order_id: order_id, auto_debit_no: auto_debit_no })
			} else {
				selectedCancel = selectedCancel.filter(v => v.customer_id !== customer_id && v.order_id !== order_id);
			}
			this.setState({ selectedCancel: selectedCancel })
		}
	}

	/* Cancel Auto Pay [START] */
	_handleCloseCancelAutoPayModal() {
		this.setState({
			cancelModal: false
		})
	}

	_handleDisplayCancelAutoPayModel() {
		if (this.state.selectedCancel.length > 0) {
			this.setState({
				cancelModal: true
			})
		} else {
			this.setState({
				errorModal: true,
				errorModalTitle: 'Cancel Subscription Error',
				errorModalBody: 'Please select transaction for Cancel Subscription',
			})
		}
	}

	_cancelAutoPay() {
		const { selectedCancel } = this.state;
		this.setState({ isCancelLoading: true, cancelModal: false })
		for (const sr of selectedCancel) {
			const { customer_id, order_id, auto_debit_no } = sr
			this.props.cancelAutoPayBegin({ customer_id: customer_id, order_id: order_id, auto_debit_no: auto_debit_no });
		}
	}
	/* Cancel Auto Pay [END] */

	render() {

		const { payments, validated, cancelModal, isCancelLoading, selectedCancel, errorModal, errorModalTitle, errorModalBody, successModal, successModalTitle, successModalBody, } = this.state;

		console.log('payments', payments)
		console.log('selectedCancel', selectedCancel)
		console.log(payments.length)
		return (
			<>
				<main>
					<section className={"cancellation section-padding pb-80"}>
						<div className={"container"}>
							<div className={"row justify-content-center"}>
								<div className={"col-xl-7 col-lg-8 col-md-10"}>
									<div className={"section-tittle mb-50 text-center"}>
										<h2>Subscription Products</h2>
									</div>
								</div>
							</div>

							{!payments.length
								? <div className={"row justify-content-center"}>
									<div className={"col-xl-7 col-lg-8 col-md-10"}>
										<div className={"section-tittle mb-50 text-center"}>
											<h5>No Subscription Products Found</h5>
										</div>
									</div>
								</div>
								: <div className={"row justify-content-start mb-50"}>
									<div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12"}>
										<Form noValidate validated={validated} className={"contact_form"} onSubmit={this._handleContinue}>
											<div className={"refund_table"}>
												<h3 className={"transaction-title"}>Recent Transactions:</h3>
												<div className={"table-responsive"}>
													<table className={"table"}>
														<thead>
															<tr>
																<th scope="col">Customer</th>
																<th scope="col">Amount</th>
																<th scope="col">Method</th>
																<th scope="col" className={"text-center"}>Cancel Subscriptions?</th>
															</tr>
														</thead>
														<tbody>
															{payments && payments.map((p, index) => {
																return (
																	<tr key={index}>
																		<td className={"customerName darkGray-bg"}>
																			<img src={'../../assets/images/payment/customer.png'}
																				alt="Customer" />
																			<span className={"custName"}>
																				{p.customer_name}
																			</span>
																		</td>
																		<td className={"darkGray-bg"}>
																			<span className={"amnt"}>${
																				p.paid_amount}</span>
																		</td>
																		<td className={"darkGray-bg"}>
																			<span className={"payMethod"}>{p.vendor}</span>
																		</td>

																		<td align="center">
																			<label htmlFor={"cancel-" + p.order_id}>
																				<div>
																					<input type="checkbox"
																						disabled={p.purchase_mode === 'subscribe' ? (p.allow_to_refund_or_cancel ? false : true) : true} className={"checkbox"} name={"cancel-" + p.order_id}
																						id={"cancel-" + p.order_id}
																						onChange={(e) => this._handleCheck(e, p)}
																					/>
																					<span className={"check-icon"}></span>
																				</div>
																			</label>
																		</td>
																	</tr>
																);
															})
															}
														</tbody>
													</table>
												</div>
												<div className={"refundBtn_inner float-right"}>
													<button type="button" disabled={isCancelLoading} className={"btn_1 text-uppercase mb-15"} onClick={() => this._handleDisplayCancelAutoPayModel()}>
														{isCancelLoading ? 'Loading…' : 'Cancel AutoPay'}
													</button>
												</div>
											</div>
										</Form>
									</div>
								</div>
							}
						</div>
					</section>
				</main>

				{/* CANCEL AUTO PAY MODAL [START] */}
				<Modal show={cancelModal}
					aria-labelledby="contained-modal-title-vcenter"
					centered>
					<Modal.Header>
						<Modal.Title>Cancel Subscription Confirmation</Modal.Title>
					</Modal.Header>
					<Modal.Body>Are you sure you want to cancel subscription?</Modal.Body>
					<Modal.Footer>
						<input type="button" className={"btn_danger text-uppercase"} value="No" onClick={() => this._handleCloseCancelAutoPayModal()} />
						<input type="button" className={"btn_1 text-uppercase"} value="Yes" onClick={() => this._cancelAutoPay()} />
					</Modal.Footer>
				</Modal>
				{/* CANCEL AUTO PAY MODAL [END] */}

				{/* ERROR MODAL [START] */}
				<Modal show={errorModal}
					onHide={() => this.setState({ errorModal: false, isCancelLoading: false })}
					aria-labelledby="contained-modal-title-vcenter"
					centered closeButton>
					<Modal.Header>
						<Modal.Title>{errorModalTitle}</Modal.Title>
					</Modal.Header>
					<Modal.Body>{errorModalBody}</Modal.Body>
				</Modal>
				{/* ERROR MODAL [END] */}

				{/* SUCCESS MODAL [START] */}
				<Modal
					size="sm"
					show={successModal}
					onHide={() => this.setState({ successModal: false, isCancelLoading: false })}
					aria-labelledby="contained-modal-title-vcenter"
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title id="example-modal-sizes-title-sm">
							{successModalTitle}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>{successModalBody}</Modal.Body>
				</Modal>
				{/* SUCCESS MODAL [END]*/}
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		list: _.get(state, 'orders.list', {}),
		cancelAutoPay: _.get(state, 'payments.cancelAutoPay', {}),
	};
};

const mapDispatchToProps = (dispatch) => ({
	getOrdersBegin: (payload) => dispatch(getOrdersBegin(payload)),
	cancelAutoPayBegin: (payload) => dispatch(cancelAutoPayBegin(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSubscriptionsList);