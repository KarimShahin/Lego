import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AccountDetails.css";
import jwt_decode from "jwt-decode";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function UpdateForm() {
	const [users] = useState(() => jwt_decode(localStorage.getItem("token")));
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
	let navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			userName: users.user.userName,
			email: users.user.email,
			day: users.user.day,
			month: users.user.month,
			year: users.user.year,
			country: users.user.country,
			city: users.user.address ? users.user.address.city : "",
			street: users.user.address ? users.user.address.street : "",
			building: users.user.address ? users.user.address.building : "",
		},

		validationSchema: Yup.object({
			userName: Yup.string()
				.max(15, "Must be 15 characters or less")
				.min(3, "Must be more than 3 characters")
				.required("Required"),
			email: Yup.string().email("Invalid email address").required("required"),
			day: Yup.number("day should be a number").max(31, "day should be two numbers DD").required("required"),
			month: Yup.number("month should be a number")
				.max(12, "month should be two numbers MM")
				.required("required"),
			year: Yup.number("year should be a number")
				.max(2010, "you can't register if your age less than 12")
				.min(1930, "your can't be a 100 years old stop lying")
				.required("required"),
			country: Yup.string().required("required"),
			city: Yup.string().required("required"),
			street: Yup.string()
				.max(10, "Street must be 10 characters max")
				.min(4, "Street must be 4 characters or more")
				.required("required"),
			building: Yup.number("building must be number").required("Number required"),
		}),

		onSubmit: (values) => {
			setIsLoading(true);
			const address = {
				city: values.city,
				street: values.street,
				building: values.building,
			};

			function getAge() {
				let today = new Date();
				let birthDate = new Date(`${values.year}/${values.month}/${values.day}`);
				let age = today.getFullYear() - birthDate.getFullYear();
				let m = today.getMonth() - birthDate.getMonth();
				if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
					age--;
				}
				return age;
			}
			const body = {
				userName: values.userName,
				email: values.email,
				country: values.country,
				address: address,
				age: getAge(),
				year: values.year,
				month: values.month,
				day: values.day,
			};

			axios
				.post("http://localhost:8080/account/update", body, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				})
				.then((res) => {
					localStorage.setItem("token", res.data.token);
					setIsLoading(false);
					navigate("/whishlist/personal", { state: { message: res.data.message } });
				})
				.catch((err) => {
					setIsLoading(false);
					openNotificationMsg("Something went wrong Please try again");
				});
		},
	});

	return (
		<>
			{isLoading && (
				<div className="inner-loader">
					<h1>Loading please hold</h1>
					<div className="lds-ring">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			)}
			{!isLoading && (
				<div>
					<form id="update-form" onSubmit={formik.handleSubmit}>
						<FormControl sx={{ width: "100%", mb: 2 }}>
							<TextField
								helperText={
									formik.touched.userName && formik.errors.userName
										? `${formik.errors.userName}`
										: null
								}
								error={formik.touched.userName && formik.errors.userName ? true : false}
								label="UserName"
								type="text"
								id="UpdateUserName"
								name={users.user.userName}
								placeholder="InitialUserName"
								{...formik.getFieldProps("userName")}
							/>
						</FormControl>

						<FormControl sx={{ width: "100%", mb: 2 }}>
							<TextField
								helperText={
									formik.touched.email && formik.errors.email ? `${formik.errors.email}` : null
								}
								error={formik.touched.email && formik.errors.email ? true : false}
								label="EmailAddress"
								type="email"
								id="UpdateEmailAdress"
								InputProps={{
									readOnly: true,
								}}
								disabled
								value={formik.values.email}
								name="email"
								placeholder="example@gmail.com"
								{...formik.getFieldProps("email")}
							/>
						</FormControl>

						<label htmlFor="birthDate" className="birthDateLabel">
							Birthdate
						</label>
						<div className="row">
							<div className="col">
								<FormControl>
									<TextField
										helperText={
											formik.touched.day && formik.errors.day ? `${formik.errors.day}` : null
										}
										error={formik.touched.day && formik.errors.day ? true : false}
										label="Day"
										type="number"
										placeholder="DD"
										// name={users.day}
										id="birthDay"
										{...formik.getFieldProps("day")}
									/>
								</FormControl>
							</div>
							<div className="col">
								<FormControl>
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
										// name={users.month}
										// name="month"
										id="birthMonth"
										{...formik.getFieldProps("month")}
									/>
								</FormControl>
							</div>
							<div className="col">
								<FormControl>
									<TextField
										helperText={
											formik.touched.year && formik.errors.year ? `${formik.errors.year}` : null
										}
										error={formik.touched.year && formik.errors.year ? true : false}
										label="Year"
										type="number"
										placeholder="YYYY"
										// name={users.year}
										// name="year"
										id="birthYear"
										{...formik.getFieldProps("year")}
									/>
								</FormControl>
							</div>
						</div>

						<FormControl sx={{ width: "100%", mt: 2 }}>
							<InputLabel id="countries-label">Country</InputLabel>
							<Select
								error={formik.touched.country && formik.errors.country ? true : false}
								labelId="countries-label"
								name={users.user.country}
								id="countries"
								{...formik.getFieldProps("country")}
								sx={{ backgroundColor: "#fff" }}
							>
								<MenuItem value="">
									<em>...</em>
								</MenuItem>
								<MenuItem value="cairo">Cairo</MenuItem>
								<MenuItem value="alex">Alex</MenuItem>
								<MenuItem value="mansoura">Mansoura</MenuItem>
								<MenuItem value="portsaid">Port Said</MenuItem>
								<MenuItem value="tanta">Tanta</MenuItem>
							</Select>
							<FormHelperText sx={{ color: "red" }}>
								{formik.touched.country && formik.errors.country ? `${formik.errors.country}` : null}
							</FormHelperText>
						</FormControl>

						<div className="row mt-3">
							<div className="col">
								<label htmlFor="UpdateCity"></label>
								<FormControl sx={{ width: "100%", mb: 2 }}>
									<TextField
										helperText={
											formik.touched.city && formik.errors.city ? `${formik.errors.city}` : null
										}
										error={formik.touched.city && formik.errors.city ? true : false}
										label="City"
										type="text"
										id="UpdateCity"
										// name={users.user.address.city ? '' : }
										name="city"
										placeholder="city"
										{...formik.getFieldProps("city")}
									/>
								</FormControl>
							</div>
							<div className="col">
								<label htmlFor="UpdateStreet"></label>
								<FormControl sx={{ width: "100%", mb: 2 }}>
									<TextField
										helperText={
											formik.touched.street && formik.errors.street
												? `${formik.errors.street}`
												: null
										}
										error={formik.touched.street && formik.errors.street ? true : false}
										label="Street"
										type="text"
										id="UpdateStreet"
										// name={users.user.address.street}
										name="street"
										placeholder="street"
										{...formik.getFieldProps("street")}
									/>
								</FormControl>
							</div>
							<div className="col">
								<label htmlFor="UpdateCity"></label>
								<FormControl sx={{ width: "100%", mb: 2 }}>
									<TextField
										helperText={
											formik.touched.building && formik.errors.building
												? `${formik.errors.building}`
												: null
										}
										error={formik.touched.building && formik.errors.building ? true : false}
										label="Building"
										type="number"
										id="UpdateBuilding"
										// name={users.user.address["building"]}
										name="building"
										placeholder="city"
										{...formik.getFieldProps("building")}
									/>
								</FormControl>
							</div>
						</div>

						<div className="d-grid gap-2 col-6 mx-auto my-4">
							<button
								disabled={formik.dirty && !formik.isValid}
								className="btn update-save-btn py-2 mb-2"
								type="submit"
							>
								Save
							</button>
							<button
								className="btn mb-2"
								style={{ backgroundColor: "transparent", color: "black" }}
								type="button"
							>
								<Link
									to={`/details`}
									className="hover-btn"
									style={{ textDecoration: "none", border: "none" }}
								>
									Go Back
								</Link>
							</button>
						</div>
					</form>
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
