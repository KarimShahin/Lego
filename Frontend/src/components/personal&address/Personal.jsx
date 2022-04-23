import React, { useEffect, useState } from "react";
import { NavLink, Navigate, useLocation } from "react-router-dom";
import Style from "./Personal.module.css";
import jwt_decode from "jwt-decode";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Personal() {
	const [users, setUsers] = useState(() => jwt_decode(localStorage.getItem("token")));
	const [notification, setNotification] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState("");
	// notification
	const Location = useLocation();
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
	useEffect(() => {
		if (Location.state) {
			openNotificationMsg(Location.state.message);
		}
		return () => {};
	}, []);
	return (
		<>
			<div>
				<div className={Style["inner-content"]}>
					{/* personal things  */}
					<h1 className={Style.nameOfBlock}>Personal & Address Details</h1>
					<div className={Style["acc-block"]}>
						<span className={Style.heading}>LEGO® Account Details</span>
						<span className={Style["personal-text"]}>
							The LEGO ID is your gateway to logging into LEGO digital experiences, go here to edit your
							LEGO Account details
						</span>
						<div className={Style["wrapper-personal-btn"]}>
							<button className={Style["personal-btn"]}>
								<NavLink to={`/details`} style={{ textDecoration: "none", color: "white" }}>
									LEGO® Account Details
								</NavLink>
							</button>
							<div className={Style["personal-email"]}>
								<span className={Style["lego-account"]}>LEGO® Account Email</span>
								<span className={Style["personal-text"]}>{users.user.email}</span>
							</div>
						</div>
					</div>
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
