import React, { Component } from 'react';
import { connect } from "react-redux";

import _ from 'lodash';

import { getCartBegin, removeCartProductBegin } from "../../store/cart/actions";
import { _getKeyByValue } from "../../utils/helper";
import { _ROUTES, _SIZE } from "../../constants/GlobalSetting";
import ErrorModal from '../common/ErrorModal';
import DeleteIcon from '../common/DeleteIcon';
import PaymentIcon from '../common/PaymentIcon';

class CartList extends Component {

	state = {
		cartId: localStorage.getItem('cartId'),
		products: [],
		selectedProducts: [],
		totalQty: 0,
		subTotal: 0,
		showError: false,
		errorMessage: '',
	};

	componentDidMount() {
		this._loadCartProducts()
	}

	_loadCartProducts() {
		const { cartId } = this.state;
		if (cartId) {
			this.props.getCartBegin({ id: cartId, purchase_mode: 'buy' });
		}
	}

	componentDidUpdate(prevProps) {
		const { list, remove } = this.props;

		if (prevProps.list !== list) {
			const { result: { data, success, error } } = list;
			if (success) {

				if (data) {
					const { products } = data;
					const _products = _.map((products || []), p => {

						return {
							cart_product_id: p.id,
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
							_size: _getKeyByValue(_SIZE, p.size),
							size: p.size,
						};
					});

					const subTotal = _.sumBy(_products, (p) => p.total);
					//let totalQty = _.sumBy(_products, function(p) { return p.qty; });

					this.setState({
						products: _products,
						//totalQty: totalQty,
						subTotal: subTotal,
					})
				} else {
					this.setState({
						products: [],
					})
				}
			} else {
				this.setState({
					showError: true,
					errorMessage: error,
				})
			}
		}

		if (prevProps.remove !== remove) {
			const { result: { data, success } } = remove;
			this._loadCartProducts()
		}
	}

	_handleRemoveCartProduct = (p) => {
		const { cartId } = this.state;
		const { product_id, cart_product_id } = p;

		let params = { id: cartId, product_id: product_id, cart_product_id: cart_product_id, }
		this.props.removeCartProductBegin(params);
	}

	_onHide = ({ showError }) => {
		this.setState({ showError })
	}

	render() {
		const { products, subTotal, showError, errorMessage } = this.state;

		return (
			<>
				<main>
					<section className={"cart_area section-padding pb-80"}>
						<div className={"container"}>
							<div className={"row justify-content-center"}>
								<div className={"col-xl-7 col-lg-8 col-md-10"}>
									<div className={"section-tittle mb-50 text-center"}>
										<h2>Items in your cart:</h2>
									</div>
								</div>
							</div>

							{!products.length
								?
								<div className={"row justify-content-center"}>
									<div className={"col-xl-7 col-lg-8 col-md-10"}>
										<div className={"section-tittle mb-50 text-center"}>
											<h5>Your Cart is empty</h5>
										</div>
									</div>
								</div>
								: <div className={"row justify-content-start mb-50"}>
									<div className={"col-xl-12 col-lg-12 col-md-12 col-sm-12"}>
										<div className={"cart_inner"}>
											<div className={"table-responsive"}>
												<table className={"table"}>
													<thead>
														<tr>
															<th scope="col">Title</th>
															<th scope="col">Size</th>
															<th scope="col">Quantity</th>
															<th scope="col">Total</th>
															<th scope="col">Action</th>
														</tr>
													</thead>
													<tbody>
														{
															products && products.map((p, index) => {
																return (
																	<tr key={index}>
																		{/* <td>
																				<label htmlFor={"item-" + p.cart_product_id}>
																						<div>
																								<input type="checkbox" className={"checkbox"}
																										id={"item-" + p.cart_product_id}
																										name="items"
																										value={p.cart_product_id}
																										onChange={(event) => this._handleProductsSelect(event, p)}
																								/>
																								<span className={"check-icon"}></span>
																						</div>
																				</label>
																		</td> */}
																		<td>
																			<p className={"mb-0 item_name"}>{p.title}</p>
																		</td>
																		<td>
																			<p className={"mb-0 item_name"}>{p._size}</p>
																		</td>
																		<td>
																			<p className={"mb-0 item_name"}>{p.qty}</p>
																		</td>
																		<td>
																			<h5 className={"price"}>${p.total}</h5>
																		</td>
																		<td>
																			<p className={"mb-0 item_name"}>
																				<DeleteIcon _handleRemoveCartProduct={() => this._handleRemoveCartProduct(p)} />
																			</p>
																		</td>
																	</tr>
																);
															})
														}

														<tr className={"sub_total"}>
															<td colSpan="3">
																<h5 className={"text-right total"}>Sub Total:</h5>
															</td>
															<td>
																<h5 className={"total_amnt"}>${subTotal}</h5>
															</td>
															<td></td>
														</tr>
													</tbody>
												</table>
												<div className={"checkout_btn_inner float-right"}>
													<a className={"btn_1 text-uppercase mb-15"} href={_ROUTES.INFORMATION}>Buy Now</a>
												</div>
											</div>
										</div>
									</div>
								</div>}
							<div className={"row justify-content-center payment-methods"}>
								<PaymentIcon images={[
									{ name: 'alipay.png' },
									{ name: 'wechatpay.png' },
									{ name: 'venmo.png' },
									{ name: 'paypal.png' },
									{ name: 'truemoney.png' },
									{ name: 'bkash.png' },
								]} />
							</div>
						</div>
					</section>
				</main>
				<ErrorModal showError={showError} title={"Error"} body={errorMessage} _onHide={this._onHide} />
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		list: _.get(state, 'carts.list', {}),
		remove: _.get(state, 'carts.remove', {}),
		login: _.get(state, 'auth.login', {}),
	};
};

const mapDispatchToProps = (dispatch) => ({
	getCartBegin: (payload) => dispatch(getCartBegin(payload)),
	removeCartProductBegin: (payload) => dispatch(removeCartProductBegin(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartList);