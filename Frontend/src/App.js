import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserCart, updateUserCart } from "./network/cartAPI";
import { useSelector, useDispatch } from "react-redux";
import { initUserCart } from "./Redux/Actions/cartActions";
import RequireAuth from "./Auh";
import RequireAdminAuth from "./AdminAuth";
import RequireUserAuth from "./UserAuth";
import RequireShipperAuth from "./ShipperAuth";
import RequireOnlyUserAuth from "./OnlyUserAuth";

import "./App.css";

const AboutUs = lazy(() => import("./components/About-us/AboutUs"));
const ShipperDashboard = lazy(() => import("./components/ShipperDashboard/ShipperDashboard"));
const ProductPage = lazy(() => import("./components/ProductPage/ProductPage"));
const MyBag = lazy(() => import("./components/Bag"));
const Personal = lazy(() => import("./components/personal&address/Personal"));
const HomePage = lazy(() => import("./components/HomePage/HomePage"));
const ProductCard = lazy(() => import("./components/ProductsCard/ProductCard"));
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
const Login = lazy(() => import("./components/Login/Login"));
const Signup = lazy(() => import("./components/Signup/Signup"));
const AccountDetails = lazy(() => import("./components/AccountDetails/AccountDetails"));
const AccountInformation = lazy(() => import("./components/AccountDetails/AccountInformation"));
const AccountSecurity = lazy(() => import("./components/AccountDetails/AccountSecurity"));
const DeleteAccount = lazy(() => import("./components/AccountDetails/DeleteAccount"));
const Layout = lazy(() => import("./components/Layout/Layout"));
const Checkout = lazy(() => import("./components/Checkout/Checkout"));
const Success = lazy(() => import("./components/Success/Success"));
const Canceled = lazy(() => import("./components/Canceled/Canceled"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));
const ContactUs = lazy(() => import("./components/Contact-us/ContactUs"));
const MyOrder = lazy(() => import("./components/Myorder/MyOrder"));
const WishListContent = lazy(() => import("./components/wishList/wishListContent/WishlistContent"));
const Wishlist = lazy(() => import("./components/wishList/wishListContent/Wishlist"));

function App() {
	const dispatch = useDispatch();
	const cart = useSelector((store) => store.cart);
	const [initCart, setInitCart] = useState(false);
	const [token] = useState(localStorage.getItem("token"));

	useEffect(() => {
		if (token) {
			if (initCart) {
				updateUserCart({ ...cart })
					.then()
					.catch();
			} else {
				setInitCart(true);
				getUserCart()
					.then((res) => dispatch(initUserCart(res.data)))
					.catch();
			}
		}
	}, [cart, token]);

	return (
		<div className="App">
			<Router>
				<Suspense
					fallback={
						<div className="loader">
							<h1>Our website is made with love</h1>
							<div className="lds-heart">
								<div></div>
							</div>
						</div>
					}
				>
					<Routes>
						<Route
							path="/mybag"
							element={
								<RequireAuth>
									<RequireOnlyUserAuth>
										<Layout>
											<MyBag />
										</Layout>
									</RequireOnlyUserAuth>
								</RequireAuth>
							}
						/>
						<Route
							path="/"
							element={
								<Layout>
									<HomePage />
								</Layout>
							}
						/>
						<Route
							path="/home"
							element={
								<Layout>
									<HomePage />
								</Layout>
							}
						/>

						<Route
							path="/whishlist"
							element={
								<RequireAuth>
									<RequireOnlyUserAuth>
										<Layout>
											<Wishlist />
										</Layout>
									</RequireOnlyUserAuth>
								</RequireAuth>
							}
						>
							<Route path="personal" element={<Personal />} />
							<Route path="myorder" element={<MyOrder />} />
							<Route path="whishlist" element={<WishListContent />} />
						</Route>
						<Route
							path="/login"
							element={
								<RequireUserAuth>
									<Login />
								</RequireUserAuth>
							}
						/>
						<Route
							path="/signup"
							element={
								<RequireUserAuth>
									<Signup />
								</RequireUserAuth>
							}
						/>
						<Route
							path="/shop-now"
							element={
								<Layout>
									<>
										<ProductCard />
										{/* <AccordionProduct /> */}
									</>
								</Layout>
							}
						/>
						<Route
							path="/card"
							element={
								<Layout>
									<ProductPage />
								</Layout>
							}
						/>
						<Route
							path="/details"
							element={
								<RequireAuth>
									<RequireOnlyUserAuth>
										<AccountDetails />
									</RequireOnlyUserAuth>
								</RequireAuth>
							}
						/>
						<Route
							path="/info"
							element={
								<RequireAuth>
									<RequireOnlyUserAuth>
										<AccountInformation />
									</RequireOnlyUserAuth>
								</RequireAuth>
							}
						/>
						<Route
							path="/security"
							element={
								<RequireAuth>
									<RequireOnlyUserAuth>
										<AccountSecurity />
									</RequireOnlyUserAuth>
								</RequireAuth>
							}
						/>
						<Route
							path="/delete-account"
							element={
								<RequireAuth>
									<RequireOnlyUserAuth>
										<DeleteAccount />
									</RequireOnlyUserAuth>
								</RequireAuth>
							}
						/>
						<Route
							path="/dashboard"
							element={
								<RequireAdminAuth>
									<Dashboard />
								</RequireAdminAuth>
							}
						/>
						<Route
							path="/shipper"
							element={
								<RequireShipperAuth>
									<ShipperDashboard />
								</RequireShipperAuth>
							}
						/>
						<Route
							path="/checkout"
							element={
								<RequireAuth>
									<RequireOnlyUserAuth>
										<Layout>
											<Checkout />
										</Layout>
									</RequireOnlyUserAuth>
								</RequireAuth>
							}
						/>
						<Route
							path="/success"
							element={
								<RequireAuth>
									<RequireOnlyUserAuth>
										<Layout>
											<Success />
										</Layout>
									</RequireOnlyUserAuth>
								</RequireAuth>
							}
						/>
						<Route
							path="/canceled"
							element={
								<RequireAuth>
									<RequireOnlyUserAuth>
										<Layout>
											<Canceled />
										</Layout>
									</RequireOnlyUserAuth>
								</RequireAuth>
							}
						/>
						<Route
							path="/contact-us"
							element={
								<Layout>
									<ContactUs />
								</Layout>
							}
						/>
						<Route
							path="/about-us"
							element={
								<Layout>
									<AboutUs />
								</Layout>
							}
						/>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Suspense>
			</Router>
		</div>
	);
}

export default App;
