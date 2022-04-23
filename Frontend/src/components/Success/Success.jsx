import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./Success.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../Redux/Actions/cartActions";
// clear cart

export default function Success() {
	//on mount get orders from cart
	// post orders to order collection with user data from token
	// admin will recive the order
	//admin will assign shipper for the order
	// order state is pending
	// shipper will get updated by the order
	//shipper will update (withShipper, isShipped, isDeliverd, isCanceled)
	// user will have get tracker ui
	const dispatch = useDispatch();
	const [state, setState] = useState(false);
	const cart = useSelector((store) => store.cart);
	const cartProducts = Object.values(cart.products);
	console.log(cartProducts);
	const products = cartProducts.map((product) => {
		return {
			product: Number(product._id),
			quantity: product.quantity,
			unit_price: product.price,
		};
	});
	const location = useLocation();
	const session_id = location.search.split("=")[1];
	const total_price = cart.totalPrice;
	useEffect(() => {
		if (cartProducts.length) {
			const user = jwt_decode(localStorage.getItem("token")).user._id;
			axios
				.post("http://localhost:8080/order", { user, products, total_price, session_id })
				.then((res) => dispatch(resetCart()))
				.catch((err) => {});
		} else {
			setState(true);
		}
	}, [cartProducts.length]);

	return (
		<>
			<div className="success">
				<h1>🎉 Thank you for your order 🎉</h1>
				<p>We are currently processing your order and will send you a confirmation email shortly</p>
			</div>
			<div className="success-button">
				<NavLink to="/shop-now">
					<button className="home-button">Continue Shopping</button>
				</NavLink>
			</div>
		</>
	);
}
