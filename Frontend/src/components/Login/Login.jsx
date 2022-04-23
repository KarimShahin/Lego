import React, { useEffect, useState } from "react";
import legoAccountLogo from "./../../assets/imgs/LEGOAccount-Logo.svg";
import close from "./../../assets/imgs/close.svg";
import legoLarge from "./../../assets/imgs/lego(1)large.png";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./Login.css";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Login() {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const Location = useLocation();
	const [notification, setNotification] = useState(false);
	const [errorNotification, setErrorNotification] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState("");
	// notification
	const openErrorMsg = (message) => {
		setNotificationMessage(message);
		setErrorNotification(true);
	};
	const hideErrorMsg = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setErrorNotification(false);
	};
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
	// end notification
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string().email("invalid email address").required("email is required"),
			password: Yup.string().required("password is required"),
		}),
		onSubmit: (values) => {
			setIsLoading(true);
			axios
				.post("http://localhost:8080/login", values)
				.then((response) => {
					localStorage.setItem("token", response.data.token);
					localStorage.setItem("refreshToken", response.data.refreshToken);
					let decode = jwt_decode(response.data.token);
					let role = decode.role;
					setIsLoading(false);
					navigate(role === "admin" ? "/dashboard" : role === "shipper" ? "/shipper" : "/home", {
						state: { message: response.data.message },
					});
				})
				.catch((error) => {
					setIsLoading(false);
					openErrorMsg(error.response.data.Error);
				});
		},
	});
	useEffect(() => {
		if (Location?.state?.message) {
			openNotificationMsg(Location.state.message);
		}
	}, []);
	// const submitLogin = (event) => {
	//   event.preventDefault();
	// };
	return (
		<>
			{isLoading && (
				<div className="inner-loader">
					<h1>Logging you in please hold</h1>
					<div className="lds-ring">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			)}
			{!isLoading && (
				<div className="auth-wrapper">
					<div className="login-container">
						<div className="header">
							<div className="title">
								<img src={legoAccountLogo} alt="Lego Logo" />
							</div>
							<div className="close">
								<NavLink to="/home">
									<img src={close} alt="close button" />
								</NavLink>
							</div>
						</div>
						<div className="logo">
							<img src={legoLarge} alt="" />
						</div>
						<Box
							component="form"
							className="lego-form"
							noValidate
							autoComplete="off"
							onSubmit={formik.handleSubmit}
						>
							<FormControl sx={{ width: "100%", px: 3, mb: 2 }}>
								<TextField
									helperText={
										formik.touched.email && formik.errors.email ? `${formik.errors.email}` : null
									}
									error={formik.touched.email && formik.errors.email ? true : false}
									id="demo-helper-text-misaligned"
									label="Email"
									{...formik.getFieldProps("email")}
								/>
							</FormControl>
							<FormControl sx={{ width: "100%", px: 3, mb: 2 }}>
								<TextField
									helperText={
										formik.touched.password && formik.errors.password
											? `${formik.errors.password}`
											: null
									}
									error={formik.touched.password && formik.errors.password ? true : false}
									id="standard-error-helper-text"
									label="Password"
									type="password"
									{...formik.getFieldProps("password")}
								/>
							</FormControl>
							<p className="logout-advice">
								Remember to log out afterwards if you are using a shared computer, for example in a
								library or school.
							</p>
							<button type="submit" className="login-button">
								Log in
							</button>
						</Box>
						<div className="go-signup">
							<p>Don't have a LEGO® Account?</p>
							<NavLink to="/signup">Create account</NavLink>
						</div>
					</div>
					<Snackbar open={errorNotification} autoHideDuration={3000} onClose={hideErrorMsg} severity="error">
						<Alert onClose={hideErrorMsg} severity="error" sx={{ width: "100%" }}>
							{notificationMessage}
						</Alert>
					</Snackbar>
					<Snackbar
						open={notification}
						autoHideDuration={3000}
						onClose={hideNotificationMsg}
						severity="success"
					>
						<Alert onClose={hideNotificationMsg} severity="success" sx={{ width: "100%" }}>
							{notificationMessage}
						</Alert>
					</Snackbar>
				</div>
			)}
		</>
	);
}

export default Login;
