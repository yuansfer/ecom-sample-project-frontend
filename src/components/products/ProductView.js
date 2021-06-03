import React, { Component } from 'react'
import { connect } from "react-redux";

import _ from 'lodash';

import { getProductBegin } from "../../store/product/actions";
import { addToCartBegin, addSubscriptionBegin, getCartModeBegin } from "../../store/cart/actions";
import { _ROUTES, _SIZE } from "../../constants/GlobalSetting";

class ProductView extends Component {

	constructor(props) {
		super(props);
		const { match: { params: { id } } } = props;

		this.state = {
			// SET CUSTOMER IN LOCAL STORAGE TEMPERORY
			customerId: localStorage.getItem('customerId'),
			productId: id,
			qty: 1,
			product: {},
			size: 'small',
			mode: '',
		};

		[
			'_handleAddToCart',
			'_handleSubscribe',
		].map((fn) => this[fn] = this[fn].bind(this));
	}

	componentDidMount() {

		const { productId, customerId } = this.state;
		if (productId) {
			this.props.getProductBegin({ id: productId });
		}

		if (customerId) {
			this.props.getCartModeBegin({ customer_id: customerId });
		}

	}

	componentDidUpdate(prevProps) {
		const { detail, added_to_cart, create_subscription, mode } = this.props;

		if (prevProps.detail !== detail) {
			const { result: { data, success } } = detail;
			if (success) {
				this.setState({ product: data })
			}
		}

		if (prevProps.added_to_cart !== added_to_cart) {
			const { result: { data, success } } = added_to_cart;
			if (success) {
				if (data[0].id) {
					localStorage.setItem('cartId', data[0].id);
				}

				if (localStorage.getItem('cartId')) {
					this.props.history.push(_ROUTES.VIEW_CART)
				}
			}
		}

		if (prevProps.create_subscription !== create_subscription) {
			const { result: { data, success } } = create_subscription;
			if (success) {
				if (data[0].id) {
					localStorage.setItem('cartId', data[0].id);
				}

				if (localStorage.getItem('cartId')) {
					this.props.history.push(_ROUTES.VIEW_SUBSCRIPTION)
				}
			}
		}

		if (prevProps.mode !== mode) {
			const { result: { data, success } } = mode;
			if (success) {

				if (data && data.mode) {
					this.setState({ mode: data.mode })
				}
			}
		}
	}

	_handleAddToCart(id) {
		const { customerId, size, qty } = this.state;
		this.props.addToCartBegin({ customer_id: customerId, product_id: id, qty: qty, size: size, purchase_mode: 'buy' });
	}

	_handleSubscribe(id) {
		const { customerId, size, qty } = this.state;
		this.props.addSubscriptionBegin({ customer_id: customerId, product_id: id, qty: qty, size: size, purchase_mode: 'subscribe', subscribe_month: 1 });
	}

	_handleUserInput = (e) => {
		console.log('this.state', this.state)

		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value });


	}

	_handleUpdateQty(flag) {
		this.setState((prevState, props) => ({
			qty: (flag === 'minus' ? (prevState.qty - 1 === 0 ? 1 : prevState.qty - 1) : prevState.qty + 1)
		}));
	}


	render() {
		const { product, size, qty, mode } = this.state;

		const sizeOptions = Object.entries(_SIZE).map(([key, value]) => <option key={key} value={value}>{key}</option>);

		return (
			<>
				<main>
					<div className={"product_image_area"}>
						<div className={"container"}>
							<div className={"row justify-content-center"}>
								<div className={"col-xl-7 col-lg-8 col-md-10"}>
									<div className={"section-tittle mb-50 text-center"}>
										<h2>Conditional Coffee</h2>
										<h4>If Coffee, Then Coffee</h4>
									</div>
								</div>
							</div>
							<div className={"row justify-content-center"}>
								<div className={"col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-20"}>
									<div className={"product_img_slide"}>
										<div className={"single_product_img"}>
											<img src={'../../assets/images/gallery/gallery1.png'} alt="#" className={"img-fluid"} />
										</div>
									</div>
								</div>
								<div className={"col-xl-6 col-lg-6 col-md-12 col-sm-12"}>
									<div className={"text-left"}>
										<p><b>{product.title} ({product.type})</b></p>
										<p style={{ textAlign: 'justify' }}>{product.description}</p>
										<div className={"card_area row"}>
											<div className={"col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 mb-2"}>
												<div className={"productPrice"}>
													<label className={"price"}>Price</label>
													<p>${product.price}</p>
												</div>
											</div>
											<div className={"col-xs-10 col-sm-10 col-md-4 col-lg-5 col-xl-5 mb-2"}>
												<div className={"product_count_area"}>
													<label className={"qty"}>Quantity</label>
													<div className={"product_count d-inline-block"}>
														<span className={"product_count_item inumber-decrement cursor-pointer"} onClick={() => this._handleUpdateQty('minus')}> <i className={"ti-minus"}></i></span>
														<input className={"product_count_item input-number"} type="text" id={"qty"} value={qty} min="1" />
														<span className={"product_count_item number-increment cursor-pointer"} onClick={() => this._handleUpdateQty('plus')}> <i className={"ti-plus"}></i></span>
													</div>
												</div>
											</div>
											<div className={"col-xs-12 col-sm-12 col-md-4 col-lg-5 col-xl-5 mb-2"}>
												<div className={"size-wrapper"}>
													<div className={"select-size"}>
														<label className={"size"}>Size</label>
														<select className={"nice-select"} name="size" id={"size"} value={size} onChange={(event) => this._handleUserInput(event)}>
															{sizeOptions}
														</select>
													</div>
												</div>
											</div>
										</div>
										<div className={"action-buttons mt-4 row"}>
											{['', 'buy'].includes(mode) && <div className={"col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2"}>
												<a href={'#'} onClick={() => this._handleAddToCart(product.id)} className={"btn_1 add_cart mr-4 d-block text-uppercase"}> add to cart</a>
											</div>}

											{['', 'subscribe'].includes(mode) && <div className={"col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2"}>
												<a href={'#'} onClick={() => this._handleSubscribe(product.id)} className={"btn_1 subscribe d-block text-uppercase"}>Subscribe</a>
											</div>}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		detail: _.get(state, 'products.search', {}),
		added_to_cart: _.get(state, 'carts.create', {}),
		create_subscription: _.get(state, 'carts.create_subscription', {}),
		mode: _.get(state, 'carts.mode', {}),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getProductBegin: (payload) => dispatch(getProductBegin(payload)),
		addToCartBegin: (payload) => dispatch(addToCartBegin(payload)),
		addSubscriptionBegin: (payload) => dispatch(addSubscriptionBegin(payload)),
		getCartModeBegin: (payload) => dispatch(getCartModeBegin(payload)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductView);