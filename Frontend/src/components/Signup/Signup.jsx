import React, { useState } from "react";
import legoAccountLogo from "./../../assets/imgs/LEGOAccount-Logo.svg";
import signupImg from "./../../assets/imgs/signupimg.png";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../Login/Login.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Signup() {
	let navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [notification, setNotification] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState("");
	// notification
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
	const formik = useFormik({
		initialValues: {
			signup_email: "",
			signup_username: "",
			signup_password: "",
			day: "",
			month: "",
			year: "",
			country: "",
		},
		validationSchema: Yup.object({
			signup_email: Yup.string().email("Invalid email address").required("required"),
			signup_username: Yup.string()
				.max(20, "Must be 20 characters or less")
				.min(5, "Must be 5 characters or more")
				.required("required"),
			signup_password: Yup.string()
				.max(20, "Must be 20 characters or less")
				.min(5, "Must be 5 characters or more")
				.required("required"),
			day: Yup.number("day should be a number").max(31, "day should be two numbers DD").required("required"),
			month: Yup.number("month should be a number")
				.max(12, "month should be two numbers MM")
				.required("required"),
			year: Yup.number("year should be a number")
				.max(2010, "you can't register if your age less than 12")
				.min(1930, "your can't be a 100 years old stop lying")
				.required("required"),
			country: Yup.string().required("required"),
		}),
		onSubmit: (values) => {
			setIsLoading(true);
			axios
				.post("http://localhost:8080/register", values)
				.then((res) => {
					setIsLoading(false);
					navigate("/login", { state: { message: res.data.message } });
				})
				.catch((err) => {
					setIsLoading(false);
					openNotificationMsg("Something went wrong please try again");
				});
		},
	});
	return (
		<>
			{isLoading && (
				<div className="inner-loader">
					<h1>Signing you up please hold</h1>
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
					<div className="login-container signup-container">
						<div className="header">
							<div className="title signup-title">
								<img src={legoAccountLogo} alt="Lego Logo" />
							</div>
						</div>
						<div className="login-suPage">
							<h2>Create your adult LEGO® Account</h2>
							<p>Already have an account?</p>
							<NavLink to="/login">Log in</NavLink>
							<div className="divider">
								<span>Or sign up</span>
							</div>
						</div>
						<div className="signup-logo">
							<img src={signupImg} alt="" />
						</div>
						<form id="signupForm" onSubmit={formik.handleSubmit} className="lego-form">
							<div className="login-email">
								<label htmlFor="signupEmail"></label>
								<FormControl sx={{ width: "100%" }}>
									<TextField
										helperText={
											formik.touched.signup_email && formik.errors.signup_email
												? `${formik.errors.signup_email}`
												: null
										}
										error={formik.touched.signup_email && formik.errors.signup_email ? true : false}
										label="Email address"
										type="email"
										id="signupEmail"
										name="signup_email"
										placeholder="example@domain.com"
										{...formik.getFieldProps("signup_email")}
									/>
								</FormControl>
							</div>
							<div className="login-username">
								<label htmlFor="signupUsername"></label>
								<FormControl sx={{ width: "100%" }}>
									<TextField
										helperText={
											formik.touched.signup_username && formik.errors.signup_username
												? `${formik.errors.signup_username}`
												: null
										}
										error={
											formik.touched.signup_username && formik.errors.signup_username
												? true
												: false
										}
										label="User Name"
										type="text"
										id="signupUsername:"
										name="signup_username"
										placeholder="username"
										{...formik.getFieldProps("signup_username")}
									/>
								</FormControl>
							</div>
							<div className="login-password">
								<FormControl sx={{ width: "100%" }}>
									<TextField
										helperText={
											formik.touched.signup_password && formik.errors.signup_password
												? `${formik.errors.signup_password}`
												: null
										}
										error={
											formik.touched.signup_password && formik.errors.signup_password
												? true
												: false
										}
										label="Password"
										type="password"
										id="signupPassword"
										name="signup_password"
										{...formik.getFieldProps("signup_password")}
									/>
								</FormControl>
							</div>
							<div className="birth-date">
								<label htmlFor="birthDate" className="birthDate">
									Birthdate
								</label>
								<div className="dateInputs">
									<div className="signup-flex-date birthInputs">
										<div>
											<FormControl>
												<TextField
													helperText={
														formik.touched.day && formik.errors.day
															? `${formik.errors.day}`
															: null
													}
													error={formik.touched.day && formik.errors.day ? true : false}
													label="Day"
													type="number"
													placeholder="DD"
													name="day"
													id="birthDay"
													{...formik.getFieldProps("day")}
												/>
											</FormControl>
										</div>
										<div>
											<TextField
												helperText={
													formik.touched.month && formik.errors.month
														? `${formik.errors.month}`
														: null
												}
												error={formik.touched.month && formik.errors.month ? true : false}
												label="Month"
												type="number"
												placeholder="MM"
												name="month"
												id="birthMonth"
												{...formik.getFieldProps("month")}
											/>
										</div>
										<div>
											<TextField
												helperText={
													formik.touched.year && formik.errors.year
														? `${formik.errors.year}`
														: null
												}
												error={formik.touched.year && formik.errors.year ? true : false}
												label="Year"
												type="number"
												placeholder="YYYY"
												name="year"
												id="birthYear"
												{...formik.getFieldProps("year")}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="countries">
								<FormControl sx={{ minWidth: 120, width: "100%" }}>
									<InputLabel id="countries-label">Governorate</InputLabel>
									<Select
										error={formik.touched.country && formik.errors.country ? true : false}
										labelId="countries-label"
										name="country"
										id="countries"
										{...formik.getFieldProps("country")}
										sx={{ backgroundColor: "#fff" }}
									>
										<MenuItem value="">
											<em>...</em>
										</MenuItem>
										<MenuItem value="cairo">Cairo</MenuItem>
										<MenuItem value="dakahlia ">Dakahlia</MenuItem>
										<MenuItem value="alexandria">Alexandria</MenuItem>
									</Select>
									<FormHelperText sx={{ color: "red" }}>
										{formik.touched.country && formik.errors.country
											? `${formik.errors.country}`
											: null}
									</FormHelperText>
								</FormControl>
							</div>
							<button type="submit" className="login-button">
								Sign up
							</button>
						</form>
					</div>
					<Snackbar
						open={notification}
						autoHideDuration={3000}
						onClose={hideNotificationMsg}
						severity="error"
					>
						<Alert onClose={hideNotificationMsg} severity="error" sx={{ width: "100%" }}>
							{notificationMessage}
						</Alert>
					</Snackbar>
				</div>
			)}
		</>
	);
}

export default Signup;
