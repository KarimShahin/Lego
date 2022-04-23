import React from "react";
import { Link } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import UpdateForm from "./UpdateForm";
import Logo from "../../assets/imgs/LEGOAccount-Logo.svg";
import "./AccountDetails.css";

export default function AccountInformation() {
	return (
		<div style={{ backgroundColor: "#f2f5f7" }}>
			<CssBaseline />
			<Container maxWidth="sm">
				<Box sx={{ bgcolor: "#f2f5f7", height: "100%" }} className="account-border">
					<Box sx={{ bgcolor: "#ffcf00", height: "12vh" }}>
						<div className="text-center">
							<button className="back-arrow">
								<Link to={`/details`}>
									<ArrowBackIosIcon fontSize="large" className="inner-back-arrow" />
								</Link>
							</button>
							<img src={Logo} alt="" className="Logo-img-account rounded" style={{ marginLeft: "0" }} />
							<button className="closing-btn">
								<Link to={`/whishlist/personal`} style={{ textDecoration: "none", color: "black" }}>
									<CloseIcon fontSize="large" className="inner-back-arrow" />
								</Link>
							</button>
						</div>
					</Box>

					<Box sx={{ mt: 2, mx: 2 }}>
						<h4 style={{ textAlign: "center", marginBottom: "16px" }}>Edit Profile</h4>
						<UpdateForm />
					</Box>
				</Box>
			</Container>
		</div>
	);
}
