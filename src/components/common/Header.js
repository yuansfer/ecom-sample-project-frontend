import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from 'react-router-dom'
// import _ from 'lodash';
import { Nav } from 'react-bootstrap';


//import { doLogoutBegin } from "../../store/auth/actions";
import { _ROUTES } from "../../constants/GlobalSetting";

const Header = () => {

	// let history = useHistory();

	// const { logoutData, loginData } = useSelector(
	// 	state => ({ logoutData: state.auth.logout, loginData: state.auth.login, })
	// );

	// if (!_.isEmpty(logoutData)) {
	// 	const { result: { success } } = logoutData;

	// 	if (success) {
	// 		history.push(_ROUTES.LOGIN);
	// 	} else {
	// 		console.log('hi')
	// 	}
	// }

	// if (!_.isEmpty(loginData)) {
	// 	const { tokenData: { userId } } = loginData
	// }

	// const dispatch = useDispatch();

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
													<Link to={_ROUTES.PRODUCTS_LIST}>Home</Link>
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
											<div className={"nav-search search-switch"}>
												<span id="search_1" className={"flaticon-search"}></span>
											</div>
										</li>
										<li>
											<Nav.Item>
												<Link to={_ROUTES.CARTS_LIST}>
													<span className={"flaticon-shopping-cart"}>
													</span>
												</Link>
											</Nav.Item>
										</li>
										<li>
											<Nav.Item>
												<Link to={_ROUTES.CUSTOMER_SUBSCRIPTION}>
													<span className={"flaticon-user"}>
													</span>
												</Link>
											</Nav.Item>
										</li>
										{/* <li>
											<a href={'#'} onClick={() => dispatch(doLogoutBegin())}>
												<span className={"flaticon-arrow"}></span>
											</a>
										</li> */}
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

export default Header;