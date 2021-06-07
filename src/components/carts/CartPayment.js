import React, { Component } from 'react'
import { connect } from "react-redux";

import _ from 'lodash';

import { getCartBegin } from "../../store/cart/actions";
import { createSecurePayBegin } from "../../store/payment/actions";

import { _getKeyByValue } from "../../utils/helper";
import { _ROUTES, _PAYMENT_METHODS, _SIZE } from "../../constants/GlobalSetting";

class CartPayment extends Component {
	state = {
		customerId: localStorage.getItem('customerId'),
		cartId: localStorage.getItem('cartId'),
		validated: false,
		products: [],
		todaysTotal: 0,
		formValues: {
			paymentMethod: "",
			termConditions: "",
		},
		formErrors: {
			paymentMethod: "",
			termConditions: "",
		},
		formValidity: {
			paymentMethod: false,
			termConditions: false,
		},
		isSubmitting: false,
	};


	componentDidMount() {
		const { cartId } = this.state;
		if (cartId) {
			this.props.getCartBegin({ id: cartId, purchase_mode: 'buy' });
		} else {
			this.props.history.push(_ROUTES.PRODUCTS_LIST)
		}
	}

	componentDidUpdate(prevProps) {
		const { list, createSecurePay } = this.props;

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
							_size: _getKeyByValue(_SIZE, p.size),
							size: p.size,
						};
					});

					const todaysTotal = _.sumBy(_products, (p) => p.total);

					this.setState({
						products: _products,
						todaysTotal: todaysTotal,
					})
				} else {
					this.props.history.push(_ROUTES.PRODUCTS_LIST)
				}

			} else {
				// ERROR
			}
		}

		if (prevProps.createSecurePay !== createSecurePay) {
			const { result: { data, success, error, message } } = createSecurePay;
			if (success) {

				const { ret_code, result, order_id } = data[0]
				if (ret_code === '000100') {
					this.setState({ isSubmitting: true })
					localStorage.setItem('orderId', order_id);
					localStorage.setItem('cartId', '');
					//result.cashierUrl && window.open(result.cashierUrl, '_blank');
					result.cashierUrl && window.open(result.cashierUrl, '_self');
					//this.props.history.push(_ROUTES.CART_PAYMENT_SUCCESS)
				} else {
					this.props.history.push(_ROUTES.CART_PAYMENT_DECLINE)
				}
			} else {
				//this.setState({ error: message })
				this.props.history.push(_ROUTES.CART_PAYMENT_DECLINE)
			}
		}
	}

	_handleChange = ({ target }) => {
		const { formValues } = this.state;
		formValues[target.name] = target.value;
		this.setState({ formValues });
		this._handleValidation(target);
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

			const { cartId, customerId, formValues: { paymentMethod }, } = this.state
			const redirectUrl = [process.env.REACT_APP_PUBLIC_URL, _ROUTES.CART_PAYMENT_SUCCESS].join('')

			this.props.createSecurePayBegin({
				customer_id: customerId,
				cart_id: cartId,
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

	render() {
		const { products, todaysTotal, formValues: { paymentMethod, termConditions }, formErrors, isSubmitting, } = this.state;

		const logoUrl = paymentMethod ? `../../assets/images/payment/logos/${paymentMethod}.png` : ''

		return (
			<>
				<main>
					<section className={"section-padding buy-product"}>
						<div className={"container"}>
							<div className={"row justify-content-center"}>
								<div className={"col-xl-7 col-lg-8 col-md-10"}>
									<div className={"section-tittle mb-50 text-center"}>
										<h2>Payment</h2>
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
															<td colSpan="3">
																<h5 className={"text-right total"}>Today's Total:</h5>
															</td>
															<td>
																<h5 className={"total_amnt"}>${todaysTotal}</h5>
															</td>
														</tr>
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
										</div>
									</div>
									<div className={"col-xl-6 col-lg-6 col-md-12 col-sm-12"} >
										<div className={"billing_details"}>
											<div className={"row contact_form col-md-12 form-group p_star mb-20"}>
												<label>Payment Method</label>
												<select className={`country_select form-control ${formErrors.paymentMethod ? 'is-invalid' : ''}`}
													name="paymentMethod" onChange={this._handleChange} value={paymentMethod}>
													<option value="" disabled>Select Payment Method</option>
													{Object.entries(_PAYMENT_METHODS).map(([key, value]) => <option key={key} value={value}>{key}</option>)}
												</select>
												<div className={"invalid-feedback"}>{formErrors.paymentMethod}</div>
											</div>
										</div>
										<div className={"row justify-content-center payment-methods"}>
											<div className={"col-xl-4 col-lg-4 col-md-6 col-sm-6"}>
												{logoUrl && <div className={"img-wrapper mb-30 p-4"}>
													<img className={"payment-method"} src={logoUrl} />
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
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		list: _.get(state, 'carts.list', {}),
		createSecurePay: _.get(state, 'payments.createSecurePay', {}),
	};
};

const mapDispatchToProps = (dispatch) => ({
	getCartBegin: (payload) => dispatch(getCartBegin(payload)),
	createSecurePayBegin: (payload) => dispatch(createSecurePayBegin(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPayment);