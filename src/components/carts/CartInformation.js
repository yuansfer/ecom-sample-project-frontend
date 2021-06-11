import React, { Component } from 'react'
import { connect } from "react-redux";

// import $ from 'jquery';

// import '../../assets/css/nice-select.css';
// import '../../assets/js/jquery.nice-select.min.js'

import _ from 'lodash';

import { getCartBegin, setShippingBegin } from "../../store/cart/actions";
import { _getKeyByValue } from "../../utils/helper";
import { _ROUTES, _SIZE, _COUNTRIES } from "../../constants/GlobalSetting";
class CartInformation extends Component {

	state = {
		sessionId: localStorage.getItem('sessionId'),
		customerId: localStorage.getItem('customerId'),
		cartId: localStorage.getItem('cartId'),
		products: [],
		todaysTotal: 0,
		validated: false,
		formValues: {
			address: "",
			cityState: "",
			country: "",
			email: "",
			phone: "",
		},
		formErrors: {
			address: "",
			cityState: "",
			country: "",
			email: "",
			phone: "",
		},
		formValidity: {
			address: false,
			cityState: false,
			country: false,
			email: false,
			phone: false,
		},
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
		const { list, set_shipping } = this.props;

		if (prevProps.list !== list) {
			const { result: { data, success } } = list;
			if (success) {

				if (data) {
					const { products, shipping_address, shipping_city_state, shipping_country, shipping_email, shipping_phone } = data;
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
						formValues: {
							address: shipping_address,
							cityState: shipping_city_state,
							country: shipping_country,
							email: shipping_email,
							phone: shipping_phone,
						}
					})
				} else {
					this.props.history.push(_ROUTES.PRODUCTS_LIST)
				}

			} else {
				// ERROR
			}
		}

		if (prevProps.set_shipping !== set_shipping) {
			const { result: { success } } = set_shipping;
			if (success) {
				this.props.history.push(_ROUTES.CART_PAYMENT)
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

		if (["address", "cityState", "email", "phone"].includes(name)) {
			fieldValidationErrors[name] = !validity[name] ? `Please enter ${name === 'cityState' ? 'City, State' : name}` : ""
		} else if (name === "country") {
			fieldValidationErrors[name] = !validity[name] ? `Please select country` : ""
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
		const { formValues, formValidity, cartId } = this.state;

		if (Object.values(formValidity).every(Boolean)) {
			this.props.setShippingBegin({
				cart_id: cartId,
				address: formValues.address,
				city_state: formValues.cityState,
				country: formValues.country,
				email: formValues.email,
				phone: formValues.phone,
			})

		} else {
			for (let key in formValues) {
				let target = {
					name: key,
					value: formValues[key]
				};
				this._handleValidation(target);
			}
		}
	};

	render() {
		const { products, todaysTotal, formValues: { address, cityState, country, email, phone }, formErrors } = this.state;

		// $(document).ready(function () {
		// 	$('select').niceSelect();
		// });

		return (
			<>
				<main>
					<section className={"checkout_area section-padding buy-product"}>
						<div className={"container"}>

							<div className={"row justify-content-center"}>
								<div className={"col-xl-7 col-lg-8 col-md-10"}>
									<div className={"section-tittle mb-50 text-center"}>
										<h2>Shipping Information</h2>
									</div>
								</div>
							</div>

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
													{
														products && products.map((p, index) => {
															return (
																<tr key={index}>
																	{/* <td>
																		<label htmlFor={"checkbok-" + index}>
																				<div>
																						<input type="checkbox" className={"checkbox"} name={"checkbok-" + index} id={"checkbok-" + index} />
																						<span className={"check-icon"}></span>
																				</div>
																		</label>
																</td> */}

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
														})
													}

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
								</div>

								<div className={"col-xl-6 col-lg-6 col-md-12 col-sm-12"}>
									<div className={"billing_details"}>
										<h3 className={"mb-4 section-title"}>Billing Information</h3>
										<form className={"row contact_form"} onSubmit={this._handleContinue}>
											<div className={"col-md-12 form-group p_star mb-20"}>
												<input type="text" className={`form-control ${formErrors.address ? 'is-invalid' : ''}`} name="address" id="address" value={address} placeholder="Mailing Address" onChange={this._handleChange} />
												<div className={"invalid-feedback"}>{formErrors.address}</div>
											</div>
											<div className={"col-md-12 form-group p_star mb-20"}>
												<input type="text" className={`form-control ${formErrors.cityState ? 'is-invalid' : ''}`} name="cityState" id="cityState" value={cityState} placeholder="City, State" onChange={this._handleChange} />
												<div className={"invalid-feedback"}>{formErrors.cityState}</div>
											</div>
											<div className={"col-md-12 form-group p_star mb-20"}>

												<select className={`country_select form-control ${formErrors.country ? 'is-invalid' : ''}`}
													id="country" name="country" onChange={this._handleChange} value={country}>
													<option value="">Select Country</option>
													{Object.entries(_COUNTRIES["countries"]).map(([key, value]) =>
														<option key={value["country"]} value={value["country"]}>{value["country"]}</option>
													)}
												</select>
												<div className={"invalid-feedback"}>{formErrors.country}</div>
												{ /* selected={country === value["country"] ? "selected" : ""} */}
											</div>

											<div className={"col-md-12 form-group p_star mb-20"}>
												<input type="email" className={`form-control ${formErrors.email ? 'is-invalid' : ''}`} name="email" id="email" value={email} placeholder="Email" onChange={this._handleChange} />
												<div className={"invalid-feedback"}>{formErrors.email}</div>
											</div>

											<div className={"col-md-12 form-group p_star mb-20"}>
												<input type="tel" className={`form-control ${formErrors.phone ? 'is-invalid' : ''}`} name="phone" id="phone" value={phone} placeholder="Phone" onChange={this._handleChange} />
												<div className={"invalid-feedback"}>{formErrors.phone}</div>
											</div>

											<div className={"col-md-12 form-group p_star text-center mt-20 mb-20"}>
												<input type="submit" className={"btn_1 text-uppercase mb-15 cursor-pointer"} value="Continue" />
											</div>

										</form>
									</div>
								</div>
							</div>
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
		set_shipping: _.get(state, 'carts.set_shipping', {}),
		login: _.get(state, 'auth.login', {}),
	};
};

const mapDispatchToProps = (dispatch) => ({
	getCartBegin: (payload) => dispatch(getCartBegin(payload)),
	setShippingBegin: (payload) => dispatch(setShippingBegin(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartInformation);

