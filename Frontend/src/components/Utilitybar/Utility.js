import "./Utility.css";
import legoUser from "../../assets/imgs/lego-user.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { resetCart } from "../../Redux/Actions/cartActions";

export default function Utility(props) {
	const dispatch = useDispatch();
	const [toggleUtility, setToggleUtility] = useState(false);
	const [notification, setNotification] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState("");
	const Navigate = useNavigate();
	const openNotificationMsg = (message) => {
		setNotificationMessage(message);
		setNotification(true);
	};
	const hideNotificationMsg = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setNotification(false);
	};
	function logout() {
		localStorage.clear();
		props.setIsLoggedIn(false);
		props.setIsAdmin(false);
		props.setIsShipper(false);
		dispatch(resetCart());
		openNotificationMsg("You Logged Out Successfully");
		Navigate("/home");
	}
	return (
		<>
			<div className={`utility-bar ${toggleUtility ? "hide" : ""}`}>
				<div className="utility-bar-styles">
					<span>FREE Shipping with orders over 1000 EGP!</span>
				</div>
				<div className="utility-bar-styles">
					{!props.isAdmin && !props.isShipper && (
						<NavLink to={props.isLoggedIn ? "/whishlist/personal" : "/login"} className="user-icon">
							<img src={legoUser} className="svg" />
							{props.isLoggedIn
								? `${jwt_decode(localStorage.getItem("token")).user.userName}`
								: "Account"}
						</NavLink>
					)}
					<button
						className="utility-logout"
						style={props.isLoggedIn ? null : { display: "none" }}
						onClick={logout}
					>
						<i className="fa-solid fa-right-from-bracket"></i>Logout
					</button>
				</div>
				<div className="utility-bar-styles">
					<button
						type="button"
						className="utility-close-btn"
						onClick={() => setToggleUtility((prev) => !prev)}
					>
						<i className="fas fa-times"></i>
					</button>
				</div>
			</div>
			<Snackbar open={notification} autoHideDuration={3000} onClose={hideNotificationMsg} severity="success">
				<Alert onClose={hideNotificationMsg} severity="success" sx={{ width: "100%" }}>
					{notificationMessage}
				</Alert>
			</Snackbar>
		</>
	);
}
