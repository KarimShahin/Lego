import React from "react";
import StripeCheckout from "./stripe-checkout/stripe-checkout";
import "./Checkout.css";
import { useSelector } from "react-redux";

export default function Checkout() {
	// comes from the cart redux
	const totalItemsCount = useSelector((store) => store.cart.totalItemsCount);
	const totalPrice = useSelector((store) => store.cart.totalPrice);
	// const { itemCount, total } = { itemCount: 1, total: 2000 };
	return (
		<div className="checkout">
			<h2>Checkout Summary</h2>
			<h3>{`Total Items: ${totalItemsCount}`}</h3>
			<h4>{`Amount to Pay: ${
				totalPrice > 1000 ? totalPrice.toFixed(2) : Number(totalPrice.toFixed(2)) + 30
			} EGP`}</h4>
			<StripeCheckout />
		</div>
	);
}
