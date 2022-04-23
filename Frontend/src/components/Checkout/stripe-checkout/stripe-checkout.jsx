import React, { useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { fetchFromAPI } from "../../../helpers";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
// import cart redux

export default function StripeCheckout() {
	const [email] = useState(() => jwt_decode(localStorage.getItem("token")).email);
	const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
	const cart = useSelector((store) => store.cart);
	const cartProducts = Object.values(cart.products);
	const [notification, setNotification] = useState(false);
	const [errorNotification, setErrorNotification] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState("");
	const cartItems = cartProducts.map((product) => {
		return {
			quantity: product.quantity,
			title: product.name,
			images: product.images.map((image) => `http://localhost:8080/images/${image}`),
			price: product.price,
		};
	});
	const hideErrorMsg = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setErrorNotification(false);
	};
	const stripe = useStripe();
	const handleCheckout = async (e) => {
		e.preventDefault();
		const blockState = jwt_decode(localStorage.getItem("token"))?.user?.blocked;
		if (blockState) {
			setErrorNotification(true);
			setNotificationMessage("you have breached our rules you are blocked");
		} else {
			const line_items = cartItems.map((item) => {
				return {
					quantity: item.quantity,
					price_data: {
						currency: "egp",
						unit_amount: item.price * 100,
						product_data: {
							name: item.title,
							description: item.description,
							images: item.images, // array of images
						},
					},
				};
			});
			const response = await fetchFromAPI("create-checkout-session", {
				body: { line_items, customer_email: email, totalPrice: cart.totalPrice },
			});
			const { sessionId } = response;
			const { error } = await stripe.redirectToCheckout({
				sessionId,
			});
			if (error) {
				return;
				// show user an error
			}
		}
	};
	return (
		<form onSubmit={handleCheckout}>
			<div>
				<input disabled type="email" placeholder="Email" value={email} className="stripe-email-input" />
				{!emailPattern.test(email) && email !== "" && <p className="error">Enter a Valid Email Address</p>}
			</div>
			<div className="submit-button">
				<button type="submit" className="checkout-button">
					Checkout
				</button>
			</div>
			<Snackbar open={errorNotification} autoHideDuration={3000} onClose={hideErrorMsg} severity="error">
				<Alert onClose={hideErrorMsg} severity="error" sx={{ width: "100%" }}>
					{notificationMessage}
				</Alert>
			</Snackbar>
		</form>
	);
}
