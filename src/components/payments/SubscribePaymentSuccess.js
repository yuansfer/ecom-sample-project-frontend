import React, { Component } from 'react'
import { connect } from "react-redux";
import { Modal } from 'react-bootstrap';

import _ from 'lodash';
import { _ROUTES, _SIZE, _SUBSCRIPTION_MONTHS } from "../../constants/GlobalSetting";

import { _getKeyByValue } from "../../utils/helper";
import { getOrderBegin } from "../../store/order/actions";
import { generateRefundBegin, cancelAutoPayBegin } from "../../store/payment/actions";

class SubscribePaymentSuccess extends Component {
	constructor(props) {
		super(props);

		this.state = {
			customerId: localStorage.getItem('customerId'),
			orderId: localStorage.getItem('orderId'),
			autoDebitNo: '',
			products: [],
			totalQty: 0,
			todaysTotal: 0,
			monthlyTotal: 0,
			refundModal: false,
			refundSuccessModal: false,
			refundErrorModal: false,
			error: '',
		};

		[
			'_handleReturnHome',
			'_handleRefundOrCancel',
		].map((fn) => this[fn] = this[fn].bind(this));
	}

	componentDidMount() {

		const { orderId } = this.state;
		if (orderId) {
			this.props.getOrderBegin({ id: orderId });
		} else {
			this.props.history.push(_ROUTES.PRODUCTS_LIST)
		}
	}

	componentDidUpdate(prevProps) {
		const { list, generateRefund, cancelAutoPay } = this.props;

		if (prevProps.list !== list) {
			const { result: { data, success } } = list;
			if (success) {

				if (data) {

					const { products, subscribe_payment } = data;
					const { auto_debit_no } = subscribe_payment

					const _products = _.map((products || []), p => {

						return {
							product_id: p.product_id,
							title: _.get(p, 'product.title', ''),
							type: _.get(p, 'product.type', ''),
							qty: parseInt(p.qty),
							price: _.get(p, 'product.price', 0),
							total: parseInt(p.qty) * _.get(p, 'product.price', 0),
							description: _.get(p, 'product.description', ''),
							published: _.get(p, 'product.published', ''),
							purchase_mode: p.purchase_mode,
							subscribe_month: p.subscribe_month,
							_subscribe_month: _getKeyByValue(_SUBSCRIPTION_MONTHS, `${p.subscribe_month}`),
							_size: _getKeyByValue(_SIZE, p.size),
							size: p.size,
						};
					});

					const todaysTotal = _.sumBy(_products, (p) => p.total);

					const monthlyTotal = _.sumBy(_products, (p) => {
						if (p.purchase_mode === 'subscribe') {
							return p.total;
						}
					});

					//let totalQty = _.sumBy(_products, function(p) { return p.qty; });

					this.setState({
						products: _products,
						//totalQty: totalQty,
						todaysTotal: todaysTotal,
						monthlyTotal: monthlyTotal,
						autoDebitNo: auto_debit_no,
					})
				}

			} else {
				// ERROR
			}
		}

		if (prevProps.generateRefund !== generateRefund) {
			const { result: { data, success, message } } = generateRefund;

			if (success) {
				const { ret_code, ret_msg, result: { status } } = data[0]
				if (ret_code === '000100' && status === 'success') {
					this.setState({ refundModal: false, refundSuccessModal: true })
					this.props.history.push(_ROUTES.PRODUCTS_LIST)
				} else {
					this.setState({ error: ret_msg, refundSuccessModal: false, refundErrorModal: true })
				}
			} else {
				this.setState({ error: message, refundSuccessModal: false, refundErrorModal: true })
			}
		}

		if (prevProps.cancelAutoPay !== cancelAutoPay) {
			const { result: { data, success, message } } = cancelAutoPay;

			if (success) {
				const { ret_code, ret_msg, } = data[0]
				if (ret_code === '000100') {
					console.log('1')
					this.setState({ refundModal: false, refundSuccessModal: true })
					this.props.history.push(_ROUTES.PRODUCTS_LIST)
				} else {
					console.log('2')
					this.setState({ error: ret_msg, refundSuccessModal: false, refundErrorModal: true })
				}
			} else {
				this.setState({ error: message, refundSuccessModal: false, refundErrorModal: true })
			}
		}
	}

	_handleReturnHome() {
		this.props.history.push(_ROUTES.PRODUCTS_LIST)
	}

	_handleRefundOrCancel() {
		this.setState({
			refundModal: true
		})
	}

	_handleGenerateRefundCancel() {
		const { orderId, customerId, autoDebitNo } = this.state;
		//this.props.generateRefundBegin({ customer_id: customer_id, order_id: order_id });
		this.props.cancelAutoPayBegin({ customer_id: customerId, order_id: orderId, auto_debit_no: autoDebitNo });
	}

	_handleCloseRefundCancelModal() {
		this.setState({
			refundModal: false
		})
	}

	render() {
		const { refundModal, refundSuccessModal, refundErrorModal, products, todaysTotal, monthlyTotal, } = this.state;

		return (
			<>
				<main>
					<section className={"section-padding buy-product"}>
						<div className={"container"}>
							<div className={"row justify-content-center"}>
								<div className={"col-xl-7 col-lg-8 col-md-10"}>
									<div className={"section-tittle mb-50 text-center"}>
										<h2>Payment Success</h2>
									</div>
								</div>
							</div>

							<div className={"row justify-content-start mb-50 items_table"}>
								<div className={"col-xl-6 col-lg-6 col-md-12 col-sm-12"}>
									<h3 className={"section-title"}>Items you subscribed</h3>
									<div className={"cart_inner"}>
										<div className={"table-responsive"}>
											<table className={"table"}>
												<thead>
													<tr>
														<th scope="col">Title</th>
														<th scope="col">Size</th>
														<th scope="col">Month(s)</th>
														<th scope="col">Quantity</th>
														<th scope="col">Total</th>
													</tr>
												</thead>
												<tbody>
													{products && products.map((p, index) => {
														return (
															<tr key={index}>
																<td>
																	<p className={"mb-0 item_name"}>{p.title}
																	</p>
																</td>
																<td>
																	<p className={"mb-0 item_name"}>{p._size}
																	</p>
																</td>
																<td>
																	<p className={"mb-0 item_name"}>{p._subscribe_month}
																	</p>
																</td>
																<td>
																	<p className={"mb-0 item_name"}>{p.qty}
																	</p>
																</td>
																<td>
																	<h5 className={"price"}>${p.total}</h5>
																</td>
															</tr>
														);
													})}

													<tr className={"subTotal"}>
														<td colSpan="4">
															<h5 className={"text-right total"}>Today's Total:</h5>
														</td>
														<td>
															<h5 className={"total_amnt"}>${todaysTotal}</h5>
														</td>
													</tr>
													{monthlyTotal > 0 && <tr className={"subTotal"}>
														<td colSpan="4">
															<h5 className={"text-right total monthly_bill"}>Total Monthly Bill:</h5>
														</td>
														<td>
															<h5 className={"total_amnt"}>${monthlyTotal}</h5>
														</td>
													</tr>}
												</tbody>
											</table>
										</div>
									</div>
								</div>
								<div className={"col-xl-6 col-lg-6 col-md-12 col-sm-12"} >
									<div className={"payment-successful eq-height"}>
										<p className={"success-message text-center"}>
											Success! Your order has been processed
											</p>
										<div className={"success text-center h-full mb-15"} >
											<img style={{ maxWidth: '350px' }} alt="Payment Success" src={'../../assets/images/payment/success.png'} />
										</div>

										<div className={"row"} >
											<div className={"col-sm-12 col-md-6 col-lg-6 col-xl-6 text-center"} >
												<input type="button" className={"btn_1 text-uppercase mb-15 cursor-pointer"} value="Return Home" onClick={() => this._handleReturnHome()} />
											</div>

											<div className={"col-sm-12 col-md-6 col-lg-6 col-xl-6 text-center"} >
												<input type="button" className={"btn_1 text-uppercase mb-15 cursor-pointer"} value="Cancel AutoPay" onClick={() => this._handleRefundOrCancel()} />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</main>

				<Modal show={refundModal}
					aria-labelledby="contained-modal-title-vcenter"
					centered>
					<Modal.Header>
						<Modal.Title>Generate Refund/Cancel Confirmation</Modal.Title>
					</Modal.Header>
					<Modal.Body>Are you sure you want to generate refund request and cancel auto debit pay?</Modal.Body>
					<Modal.Footer>
						<input type="button" className={"btn_danger text-uppercase"} value="No" onClick={() => this._handleCloseRefundCancelModal()} />

						<input type="button" className={"btn_1 text-uppercase"} value="Yes" onClick={() => this._handleGenerateRefundCancel()} />
					</Modal.Footer>
				</Modal>

				<Modal
					size="sm"
					show={refundSuccessModal}
					onHide={() => this.setState({ refundSuccessModal: false })}
					aria-labelledby="contained-modal-title-vcenter"
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title id="example-modal-sizes-title-sm">
							Refund Success
							</Modal.Title>
					</Modal.Header>
					<Modal.Body>Refund Generated Successfully</Modal.Body>
				</Modal>

				<Modal
					size="sm"
					show={refundErrorModal}
					onHide={() => this.setState({ refundErrorModal: false })}
					aria-labelledby="contained-modal-title-vcenter"
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title id="example-modal-sizes-title-sm">
							Refund Error
                        </Modal.Title>
					</Modal.Header>
					<Modal.Body>error</Modal.Body>
				</Modal>
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		list: _.get(state, 'orders.get', {}),
		generateRefund: _.get(state, 'payments.generateRefund', {}),
		cancelAutoPay: _.get(state, 'payments.cancelAutoPay', {}),
	};
};

const mapDispatchToProps = (dispatch) => ({
	getOrderBegin: (payload) => dispatch(getOrderBegin(payload)),
	generateRefundBegin: (payload) => dispatch(generateRefundBegin(payload)),
	cancelAutoPayBegin: (payload) => dispatch(cancelAutoPayBegin(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscribePaymentSuccess);

