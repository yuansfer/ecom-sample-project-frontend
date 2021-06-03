import React, { Component } from 'react'
import { connect } from "react-redux";

import _ from 'lodash';

import { getCartBegin } from "../../store/cart/actions";
import { _getKeyByValue } from "../../utils/helper";
import { _ROUTES, _SIZE, _SUBSCRIPTION_MONTHS } from "../../constants/GlobalSetting";

class SubscribePaymentDecline extends Component {
	constructor(props) {
		super(props);

		this.state = {
			customerId: localStorage.getItem('customerId'),
			cartId: localStorage.getItem('cartId'),
			tmp: localStorage.getItem('tmp'),
			validated: false,
			products: [],
			todaysTotal: 0,
			monthlyTotal: 0,
		};

		[
			'_handleTryAgain',
		].map((fn) => this[fn] = this[fn].bind(this));
	}

	componentDidMount() {
		const { cartId } = this.state;
		if (cartId) {
			this.props.getCartBegin({ id: cartId, purchase_mode: 'subscribe' });
		}
	}

	componentDidUpdate(prevProps) {
		const { list } = this.props;

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
						todaysTotal: todaysTotal,
						monthlyTotal: monthlyTotal,
					})
				}

			} else {
				// ERROR
			}
		}
	}

	_handleTryAgain() {
		const queryString = this.state.tmp ? '/?tmp=' + this.state.tmp : '';
		this.props.history.push(_ROUTES.SUBSCRIPTION_PAYMENT + queryString)
	}

	render() {
		const { products, todaysTotal, monthlyTotal } = this.state;

		return (
			<>
				<main>
					<section className={"section-padding buy-product"}>
						<div className={"container"}>
							<div className={"row justify-content-center"}>
								<div className={"col-xl-7 col-lg-8 col-md-10"}>
									<div className={"section-tittle mb-50 text-center"}>
										<h2>Payment Declined</h2>
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
								<div className={"col-xl-6 col-lg-6 col-md-12 col-sm-12"}>
									<div className={"payment-fail eq-height"}>
										<p className={"fail-message text-center"}>
											Uh Oh! Your Order could not be processed
                    </p>
										<div className={"fail text-center h-full mb-15"}>
											<img style={{ maxWidth: '350px' }} alt="Payment Failed" src={'../../assets/images/payment/fail.png'} />
										</div>
										<div className={"row"}>
											<div className={"col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center"}>
												<input type="button" className={"btn_1 text-uppercase mb-15 cursor-pointer"} value="Try Again" onClick={() => this._handleTryAgain()} />
											</div>
										</div>
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
	};
};

const mapDispatchToProps = (dispatch) => ({
	getCartBegin: (payload) => dispatch(getCartBegin(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscribePaymentDecline);