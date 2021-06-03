import React, { Component } from 'react';
import { connect } from "react-redux";

import _ from 'lodash';

import { getCartBegin, removeCartProductBegin } from "../../store/cart/actions";
import { _getKeyByValue } from "../../utils/helper";
import { _ROUTES, _SIZE } from "../../constants/GlobalSetting";

class CartList extends Component {

	state = {
			cartId: localStorage.getItem('cartId'),
			products: [],
			selectedProducts: [],
			totalQty: 0,
			subTotal: 0,
			checkedItems: new Map()
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
			const { result: { data, success } } = list;
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
				// ERROR
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

	render() {
		const { products, subTotal, } = this.state;

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
																				<svg onClick={() => this._handleRemoveCartProduct(p)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2577fd" className="bi bi-trash cursor-pointer" viewBox="0 0 16 16">
																					<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
																					<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
																				</svg>
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
								<div className={"col-xl-4 col-lg-4 col-md-6 col-sm-6"}>
									<div className={"img-wrapper mb-30 p-4"}>
										<img className={"payment-method"} src={"../../assets/images/payment/logos/alipay.png"} alt="" />
									</div>
								</div>
								<div className={"col-xl-4 col-lg-4 col-md-6 col-sm-6"} >
									<div className={"img-wrapper mb-30 p-4"} >
										<img className={"payment-method"} src={"../../assets/images/payment/logos/wechatpay.png"} alt="" />
									</div>
								</div>
								<div className={"col-xl-4 col-lg-4 col-md-6 col-sm-6"}>
									<div className={"img-wrapper mb-30 p-4"}>
										<img className={"payment-method"} src={"../../assets/images/payment/logos/venmo.png"} alt="" />
									</div>
								</div>
								<div className={"col-xl-4 col-lg-4 col-md-6 col-sm-6"} >
									<div className={"img-wrapper mb-30 p-4"} >
										<img className={"payment-method"} src={"../../assets/images/payment/logos/paypal.png"} alt="" />
									</div>
								</div>
								<div className={"col-xl-4 col-lg-4 col-md-6 col-sm-6"} >
									<div className={"img-wrapper mb-30 p-4"} >
										<img className={"payment-method"} src={"../../assets/images/payment/logos/truemoney.png"} alt="" />
									</div>
								</div>
								<div className={"col-xl-4 col-lg-4 col-md-6 col-sm-6"} >
									<div className={"img-wrapper mb-30 p-4"} >
										<img className={"payment-method"} src={"../../assets/images/payment/logos/bkash.png"} alt="" />
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
		remove: _.get(state, 'carts.remove', {}),
	};
};

const mapDispatchToProps = (dispatch) => ({
	getCartBegin: (payload) => dispatch(getCartBegin(payload)),
	removeCartProductBegin: (payload) => dispatch(removeCartProductBegin(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartList);