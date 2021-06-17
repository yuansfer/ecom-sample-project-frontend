import React, { Component } from 'react'
import { connect } from "react-redux";

import { Link, withRouter } from 'react-router-dom'
import _ from 'lodash';
import { Nav } from 'react-bootstrap';

import { _logoutLocalStorage, _isLoggedIn, isMerchant, isCustomer } from "../../utils/helper";
import { doLogoutBegin } from "../../store/auth/actions";
import { _ROUTES } from "../../constants/GlobalSetting";
const $ = window.$;

class Header extends Component {

	componentDidMount() {
		$('[data-toggle="tooltip"]').tooltip();
	}

	componentDidUpdate(prevProps) {
		$('[data-toggle="tooltip"]').tooltip();
		const { logout, history } = this.props;
		if (prevProps.logout !== logout) {
			const { result: { success } } = logout;
			if (success) {
				_logoutLocalStorage()
				history.push(_ROUTES.LOGIN);
			}
		}
	}

	_handleLogout = () => {
		this.props.doLogoutBegin()
	}

	render() {
		return (
			<>
				<header>
					<div className={"header-area"}>
						<div className={"main-header header-sticky"}>
							<div className={"container"}>
								<div className={"menu-wrapper"}>

									<div className={"logo"}>
										<Nav.Item>
											<Link to={_ROUTES.PRODUCTS_LIST}><img src={"../../assets/images/logo/yuansfer_logo.svg"} alt="Yuansfer" style={{ maxWidth: 140 }} /></Link>
										</Nav.Item>
									</div>

									<div className={"main-menu d-none d-lg-block ml-5"}>
										<Nav activeKey={_ROUTES.PRODUCTS_LIST}>
											<ul id="navigation">
												<li>
													<Nav.Item>
														<Link to={_ROUTES.PRODUCTS_LIST}>Products</Link>
													</Nav.Item>
												</li>
												<li>
													<Nav.Item>
														<Link to={_ROUTES.CARTS_LIST}>Shop</Link>
													</Nav.Item>
												</li>
												<li>
													<Nav.Item>
														<Link to={"#"}>About</Link>
													</Nav.Item>
												</li>
												<li>
													<Nav.Item>
														<Link to={"#"}>Blog</Link>
													</Nav.Item>
												</li>
												<li>
													<Nav.Item>
														<Link to={"#"}>Contact</Link>
													</Nav.Item>
												</li>
											</ul>
										</Nav>
									</div>

									<div className={"header-right ml-auto"}>
										<ul>
											<li>
												<Nav.Item>
													<Link to={_ROUTES.CARTS_LIST}>
														<span className={"flaticon-shopping-cart"} data-toggle="tooltip" title="Cart">
														</span>
													</Link>
												</Nav.Item>
											</li>

											{(_isLoggedIn() && isCustomer()) && <li>
												<Nav.Item>
													<Link to={_ROUTES.CUSTOMER_SUBSCRIPTION}>
														<span data-toggle="tooltip" title="Subscription">
															<i className="fa fa-history" ></i>
														</span>
													</Link>
												</Nav.Item>
											</li>}

											{(_isLoggedIn() && isCustomer()) && <li>
												<span className={"flaticon-user"}>
												</span>
											</li>}

											{(_isLoggedIn() && isMerchant()) && <li>
												<Nav.Item>
													<Link to={_ROUTES.PAYMENT_REFUND_CANCEL}>
														<span data-toggle="tooltip" title="Refund/Cancel">
															<i className="fa fa-list" ></i>
														</span>
													</Link>
												</Nav.Item>
											</li>}


											{!_isLoggedIn() && <li>
												<Nav.Item>
													<Link to={_ROUTES.LOGIN}>
														<span data-toggle="tooltip" title="Login">
															<i className="fa fa-sign-in-alt" ></i>
														</span>
													</Link>
												</Nav.Item>
											</li>}

											{_isLoggedIn() &&
												<li>
												<span data-toggle="tooltip" title="Logout" onClick={() => this._handleLogout()}>
														<i className="fa fa-sign-out-alt" ></i>
													</span>
												</li>}
										</ul>
									</div>
								</div>
								<div className={"col-12"}>
									<div className={"mobile_menu d-block d-lg-none"}></div>
								</div>
							</div>
						</div>
					</div>
				</header>
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		login: _.get(state, 'auth.login', {}),
		logout: _.get(state, 'auth.logout', {}),
	};
};

const mapDispatchToProps = (dispatch) => ({
	doLogoutBegin: () => dispatch(doLogoutBegin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));