import React, { Component } from 'react'
import { connect } from "react-redux";

import queryString from 'query-string';
import _ from 'lodash';

import { getCartBegin } from "../../store/cart/actions";
import { recurringAuthBegin, recurringPayBegin } from "../../store/payment/actions";

import { _getKeyByValue } from "../../utils/helper";
import { _ROUTES, _RECURRING_PAYMENT_METHODS, _SIZE, _SUBSCRIPTION_MONTHS } from "../../constants/GlobalSetting";
import ErrorModal from '../common/ErrorModal';

class SubscriptionPayment extends Component {
	constructor(props) {
		super(props);

		const params = queryString.parse(this.props.location.search);

		this.state = {
			customerId: localStorage.getItem('customerId'),
			cartId: localStorage.getItem('cartId'),
			products: [],
			formValues: {
				paymentMethod: "",
				termConditions: "",
				billingAutomatically: "",
			},
			formErrors: {
				paymentMethod: "",
				termConditions: "",
				billingAutomatically: "",
			},
			formValidity: {
				paymentMethod: false,
				termConditions: false,
				billingAutomatically: false,
			},
			isSubmitting: false,
			totalQty: 0,
			todaysTotal: 0,
			monthlyTotal: 0,
			tmp: params.tmp || "",

			showError: false,
			errorTitle: '',
			errorMessage: '',
		};
	}

	componentDidMount() {
		const { cartId, customerId, tmp } = this.state;
		if (cartId) {
			this.props.getCartBegin({ id: cartId, purchase_mode: 'subscribe' });
		}

		if (tmp) {
			this.props.recurringPayBegin({ customer_id: customerId, tmp: tmp });
		}
	}

	componentDidUpdate(prevProps) {

		const { list, doRecurringAuth, doRecurringPay } = this.props;

		if (prevProps.list !== list) {
			const { result: { data, success } } = list;
			if (success) {

				if (data) {
					const { products } = data;
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

					this.setState({
						products: _products,
						//total_qty: total_qty,
						todaysTotal: todaysTotal,
						monthlyTotal: monthlyTotal,
					})
				} else {
					this.props.history.push(_ROUTES.PRODUCTS_LIST)
				}

			} else {
				// ERROR
			}
		}

		if (prevProps.doRecurringAuth !== doRecurringAuth) {
			const { result: { data, success, message } } = doRecurringAuth;
			if (success) {
				let { authUrl } = data[0]

				authUrl = decodeURI(authUrl)
				window.open(authUrl, "_self")
				//window.open(authUrl, "_blank")
			} else {

				this.props.history.push(_ROUTES.SUBSCRIBE_PAYMENT_DECLINE)
				this.setState({
					isSubmitting: false,
					showError: true,
					errorTitle: 'Auth Error',
					errorMessage: message,
				})
			}
		}

		if (prevProps.doRecurringPay !== doRecurringPay) {
			const { result: { success, data } } = doRecurringPay;
			if (success) {
				let { order_id } = data[0]

				this.setState({ isSubmitting: true })
				localStorage.setItem('orderId', order_id);
				localStorage.setItem('cartId', '');

				this.props.history.push(_ROUTES.SUBSCRIBE_PAYMENT_SUCCESS)
			} else {
				// ERROR
				this.setState({ isSubmitting: false })
				localStorage.setItem('tmp', this.state.tmp);
				this.props.history.push(_ROUTES.SUBSCRIBE_PAYMENT_DECLINE)
			}
		}
	}

	_handleChange = ({ target }) => {
		const { formValues } = this.state;
		formValues[target.name] = target.value;
		this.setState({ formValues });
		this._handleValidation({ name: target.name, value: target.value, });
	};

	_handleValidation = target => {

		let { name, value, checked } = target;

		value = (typeof checked !== "undefined" && !checked) ? "" : value;

		const fieldValidationErrors = this.state.formErrors;
		const validity = this.state.formValidity;

		validity[name] = value && value.length > 0 ? true : false;

		if (name === "paymentMethod") {
			fieldValidationErrors[name] = !validity[name] ? "Please select payment method" : ""
		} else if (name === "termConditions") {
			fieldValidationErrors[name] = !validity[name] ? "Please agree the terms and conditions" : ""
		} else if (name === "billingAutomatically") {
			fieldValidationErrors[name] = !validity[name] ? "Please check billed automatically" : ""
		}

		if (validity[name]) {
			// For advance validation
		}

		this.setState({
			formErrors: fieldValidationErrors,
			formValidity: validity
		});
	};

	_handleContinue = event => {
		event.preventDefault();

		const { formValues, formValidity } = this.state;

		if (Object.values(formValidity).every(Boolean)) {

			this.setState({ isSubmitting: true });

			const { customerId, formValues: { paymentMethod } } = this.state
			const redirectUrl = [process.env.REACT_APP_PUBLIC_URL, _ROUTES.SUBSCRIPTION_PAYMENT].join('')

			this.props.recurringAuthBegin({
				customer_id: customerId,
				vendor: paymentMethod,
				redirect_url: redirectUrl,
			})

		} else {
			for (let key in formValues) {
				let target = {
					name: key,
					value: formValues[key]
				};
				this._handleValidation(target);
			}
			this.setState({ isSubmitting: false });
		}
	};

	_onHide = ({ showError, isSubmitting }) => {
		this.setState({ showError, isSubmitting })
	}

	render() {
		const { products, todaysTotal, monthlyTotal, formValues: { paymentMethod }, formErrors, isSubmitting, showError, errorTitle, errorMessage } = this.state;

		const logoUrl = paymentMethod ? `../../assets/images/payment/logos/${paymentMethod}.png` : ''

		return (
			<>
				<main>
					<section className={"section-padding buy-product"}>
						<div className={"container"}>
							<div className={"row justify-content-center"}>
								<div className={"col-xl-7 col-lg-8 col-md-10"}>
									<div className={"section-tittle mb-50 text-center"}>
										<h2>Subscription Payment</h2>
									</div>
								</div>
							</div>
							<form onSubmit={this._handleContinue}>
								<div className={"row justify-content-start mb-50 items_table"}>
									<div className={"col-xl-6 col-lg-6 col-md-12 col-sm-12"}>
										<h3 className={"section-title"}>Items in your cart</h3>
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
														{
															products && products.map((p, index) => {
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
															})
														}

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
										<div className={"agreement mb-4"}>
											<div className={"agreeTerms mb-1 form-check"}>
												<input type="checkbox" id="termConditions" name="termConditions" value={'1'} className={`form-check-input cursor-pointer ${formErrors.termConditions ? 'is-invalid' : ''}`} onChange={this._handleChange} />
												<label htmlFor="termConditions" className={"form-check-label"}>I agree to the terms and conditions</label>
												<div className={"invalid-feedback"}>{formErrors.termConditions}</div>
											</div>
											<div className={"autoBill"}>
												<div className={"agreeTerms mb-1 form-check"}>
													<input type="checkbox" id="billingAutomatically" name="billingAutomatically" value={'1'}
														className={`form-check-input cursor-pointer ${formErrors.billingAutomatically ? 'is-invalid' : ''}`} onChange={this._handleChange} />
													<label htmlFor="billingAutomatically" className="form-check-label">I would like to be billed automatically</label>
													<div className="invalid-feedback">{formErrors.billingAutomatically}</div>
												</div>
											</div>
										</div>
									</div>
									<div className={"col-xl-6 col-lg-6 col-md-12 col-sm-12"} >
										<div className={"billing_details"}>
											<div className={"row contact_form col-md-12 form-group p_star mb-20"}>
												<label>Payment Method</label>
												<select className={`country_select form-control ${formErrors.paymentMethod ? 'is-invalid' : ''}`}
													name="paymentMethod" onChange={this._handleChange} value={paymentMethod}>
													<option value="" disabled>Select Payment Method</option>
													{Object.entries(_RECURRING_PAYMENT_METHODS).map(([key, value]) => <option key={key} value={value}>{key}</option>)}
												</select>
												<div className={"invalid-feedback"}>{formErrors.paymentMethod}</div>
											</div>
										</div>
										<div className={"row justify-content-center payment-methods"} >
											<div className={"col-xl-4 col-lg-4 col-md-6 col-sm-6"} >
												{logoUrl && <div className={"img-wrapper mb-30 p-4"} >
													<img alt="No Found" className={"payment-method"} src={logoUrl} />
												</div>}
											</div>
										</div>
										<div className={"col-md-12 form-group p_star text-center mt-20 mb-20"} >
											<button type="submit" className={"btn_1 text-uppercase mb-15 cursor-pointer"} disabled={isSubmitting}>
												{isSubmitting ? "Please wait..." : "Continue"}
											</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</section>
				</main>
				<ErrorModal showError={showError} title={errorTitle} body={errorMessage} _onHide={this._onHide} />
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		list: _.get(state, 'carts.list', {}),
		doRecurringAuth: _.get(state, 'payments.doRecurringAuth', {}),
		doRecurringPay: _.get(state, 'payments.doRecurringPay', {}),
		login: _.get(state, 'auth.login', {}),
	};
};

const mapDispatchToProps = (dispatch) => ({
	getCartBegin: (payload) => dispatch(getCartBegin(payload)),
	recurringAuthBegin: (payload) => dispatch(recurringAuthBegin(payload)),
	recurringPayBegin: (payload) => dispatch(recurringPayBegin(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionPayment);