import React from 'react'
import { connect } from "react-redux";
import _ from 'lodash';
import { getProductsBegin } from "../../store/product/actions";
class ProductsList extends React.Component {

	state = {
		products: []
	}

	componentDidMount() {
		localStorage.removeItem('orderId')
		this.props.getProductsBegin();
	}

	componentDidUpdate(prevProps) {
		const { list } = this.props;
		if (prevProps.list !== list) {
			const { result: { data, success } } = list;

			if (success) {
				this.setState({
					products: data,
				})

			} else {
				// ERROR
			}
		}
	}

	render() {
		const { products } = this.state;

		return (
			<>
				<main>
					<div className={"popular-items section-padding"}>
						<div className={"container"}>
							<div className={"row justify-content-center"}>
								<div className={"col-xl-7 col-lg-8 col-md-10"}>
									<div className={"section-tittle mb-70 text-center"}>
										<h2>Conditional Coffee</h2>
										<h4>If Coffee, Then Coffee</h4>
									</div>
								</div>

								<div className={"row"}>
									{
										products && products.map((product, index) => {
											const shortDescription = product.description.substring(0, 200) + "...";
											return (

												<div key={index} className={"col-xl-4 col-lg-4 col-md-6 col-sm-6"}>
													<a href={'products/' + product.id + '/view'} className={"single-popular-items mb-50 text-center"}>
														<div className={"popular-img"}>
															<img src={'../../assets/images/gallery/Product.jpg'} alt="Product" />

															<div className={"img-cap"}>
																<div className={"meta-wrapper p-3"}>
																	<span><i className={"fa fa-plus"}></i></span>
																	<div className={"item-det ml-3"}>
																		<h3 className={"mb-0 text-left"}>{product.title} <span>(${product.price})</span></h3>
																		<h5 className={"mb-0 text-left"}>{product.type}</h5>
																	</div>
																</div>
															</div>
														</div>

														<div className={"popular-caption p-2"}>
															<span>{shortDescription}</span>
														</div>
													</a>
												</div>
											);
										})
									}
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
		list: _.get(state, 'products.list', {}),
	};
};

const mapDispatchToProps = (dispatch) => ({
	getProductsBegin: () => dispatch(getProductsBegin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);