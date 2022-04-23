import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Promo() {
	const totalItemsCount = useSelector((store) => store.cart.totalItemsCount);
	const totalPrice = useSelector((store) => store.cart.totalPrice);
	const navigate = useNavigate();
	const [errorNotification, setErrorNotification] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState("");
	const [product] = useState({
		name: "Product",
		price: 10,
		ammount: 3,
	});
	const hideErrorMsg = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setErrorNotification(false);
	};
	const handleClick = () => {
		const blockState = jwt_decode(localStorage.getItem("token"))?.user?.blocked;
		if (blockState) {
			setErrorNotification(true);
			setNotificationMessage("you have breached our rules you are blocked");
		} else navigate("/checkout");
	};
	return (
		<div className="col-12 col-md-4">
			<div className="bg-white p-3">
				<p className="border-bottom fs-3">Order Summary</p>

				<div className="py-3">
					<div className="d-flex justify-content-between">
						<p className="fs-5">Order value ({totalItemsCount}) items</p>
						<p className="fs-5">{totalPrice ? `${totalPrice.toFixed(2)} EGP` : "-"}</p>
					</div>
					<div className="d-flex justify-content-between">
						<p className="fs-5">Shipping cost</p>
						<p className="fs-5">{totalPrice ? (totalPrice > 1000 ? "FREE" : "30 EGP") : "-"}</p>
					</div>
					<div className="d-flex justify-content-between">
						<p className="fs-5">Order Total</p>
						<p className="fs-5">
							{totalPrice
								? totalPrice > 1000
									? `${totalPrice.toFixed(2)} EGP`
									: `${Number(totalPrice.toFixed(2)) + 30} EGP`
								: "-"}
						</p>
					</div>
					<button
						onClick={handleClick}
						type="button"
						className="btn btn-warning w-100"
						style={{ paddingBlock: "1rem" }}
					>
						Checkout Securely
					</button>
				</div>
			</div>
			<Snackbar open={errorNotification} autoHideDuration={3000} onClose={hideErrorMsg} severity="error">
				<Alert onClose={hideErrorMsg} severity="error" sx={{ width: "100%" }}>
					{notificationMessage}
				</Alert>
			</Snackbar>
		</div>
	);
}
