import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import Logo from "../../assets/imgs/LEGOAccount-Logo.svg";
import "./AccountDetails.css";

export default function AccountSecurity() {
	let navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			oldPassword: "",
			newPassword: "",
			confirmNewPassword: "",
		},

		validationSchema: Yup.object({
			oldPassword: Yup.string()
				.max(20, "Must be 20 characters or less")
				.min(5, "Must be 5 characters or more")
				.required("Please enter your password"),
			newPassword: Yup.string()
				.required("Required")
				.matches(
					/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
					"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
				),
			confirmNewPassword: Yup.string()
				.required("Required")
				.oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
		}),

		onSubmit: (values) => {
			axios
				.post("http://localhost:8080/account/change-password", values, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				})
				.then((res) => {
					localStorage.clear();
					navigate("/login");
				})
				.catch((err) => {});
		},
	});

	return (
		<div style={{ width: "100vw", minHeight: "100vh", backgroundColor: "#f2f5f7" }}>
			<CssBaseline />
			<Container maxWidth="sm">
				<Box sx={{ bgcolor: "#f2f5f7", height: "100%" }} className="account-border">
					<Box sx={{ bgcolor: "#ffcf00", height: "12vh" }}>
						<div className="text-center">
							<button className="back-arrow">
								<Link to={`/details`} style={{ textDecoration: "none", color: "black" }}>
									<ArrowBackIosIcon fontSize="large" />
								</Link>
							</button>
							<img src={Logo} alt="" className="Logo-img-account rounded" style={{ marginLeft: "0" }} />
							<button className="closing-btn">
								<Link to={`/whishlist/personal`} style={{ textDecoration: "none", color: "black" }}>
									<CloseIcon fontSize="large" />
								</Link>
							</button>
						</div>
					</Box>

					<Box sx={{ mt: 2, mx: 7 }}>
						<h4 style={{ textAlign: "center", marginBottom: "16px" }}>Security</h4>

						<h4 style={{ textAlign: "center", marginBottom: "16px" }}>
							Do you want to change your password?
						</h4>

						<form id="security-form" sx={{ mb: "0" }} onSubmit={formik.handleSubmit}>
							<FormControl sx={{ width: "100%", pb: 2 }} variant="filled">
								<TextField
									helperText={
										formik.touched.oldPassword && formik.errors.oldPassword
											? `${formik.errors.oldPassword}`
											: null
									}
									error={formik.touched.oldPassword && formik.errors.oldPassword ? true : false}
									label="Password"
									type="password"
									id="oldPassword"
									name="oldPassword"
									{...formik.getFieldProps("oldPassword")}
								/>
							</FormControl>
							<FormControl sx={{ width: "100%", pb: 2 }} variant="filled">
								<TextField
									helperText={
										formik.touched.newPassword && formik.errors.newPassword
											? `${formik.errors.newPassword}`
											: null
									}
									error={formik.touched.newPassword && formik.errors.newPassword ? true : false}
									label="New Password"
									type="password"
									id="newPassword"
									name="newPassword"
									{...formik.getFieldProps("newPassword")}
								/>
							</FormControl>
							<FormControl sx={{ width: "100%", pb: 2 }} variant="filled">
								<TextField
									helperText={
										formik.touched.confirmNewPassword && formik.errors.confirmNewPassword
											? `${formik.errors.confirmNewPassword}`
											: null
									}
									error={
										formik.touched.confirmNewPassword && formik.errors.confirmNewPassword
											? true
											: false
									}
									label="Confirm New Password"
									type="password"
									id="confirmNewPassword"
									name="confirmNewPassword"
									{...formik.getFieldProps("confirmNewPassword")}
								/>
							</FormControl>

							<div className="d-grid gap-2 col-6 mx-auto my-2">
								<button
									className="btn update-save-btn py-2 px-1 mb-2"
									style={{
										backgroundColor: "#006cb6",
										color: "white",
										fontSize: "20px",
									}}
									disabled={!formik.dirty && formik.isValid}
									type="submit"
								>
									{/* TODO: sent confirmation to user email */}
									Save
								</button>
							</div>
						</form>

						<div className="d-grid gap-2 col-6 mx-auto my-4">
							<button
								className="btn delete-account-btn py-2 mb-2"
								style={{
									backgroundColor: "red",
									color: "white",
									fontSize: "20px",
								}}
								type=""
							>
								<Link to={`/delete-account`} style={{ textDecoration: "none", color: "white" }}>
									Delete Account
								</Link>
							</button>
							<button
								className="btn mb-2 p-3"
								style={{
									backgroundColor: "transparent",
									fontSize: "20px",
									color: "black",
								}}
								type="button"
							>
								<Link
									to={`/details`}
									style={{
										textDecoration: "none",
										border: "none",
									}}
									className="go-back-btn hover-btn"
								>
									Go Back
								</Link>
							</button>
						</div>
					</Box>
				</Box>
			</Container>
		</div>
	);
}
