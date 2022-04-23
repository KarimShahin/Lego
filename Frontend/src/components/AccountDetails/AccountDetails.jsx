import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

import Logo from "../../assets/imgs/LEGOAccount-Logo.svg";
import AvatarImage from "../../assets/imgs/avatar1.png";
import InfoImage from "../../assets/imgs/information_icon.svg";
import ScurityIcon from "../../assets/imgs/esecurity_icon.svg";

import "./AccountDetails.css";
import { NavLink } from "react-router-dom";

export default function AccountDetails() {
	return (
		<div className="account-body">
			<CssBaseline />
			<Container maxWidth="sm">
				<Box sx={{ bgcolor: "#f2f5f7", height: "100%" }} className="account-border">
					<Box sx={{ bgcolor: "#ffcf00", height: "12vh" }}>
						<div className="text-center">
							<img src={Logo} alt="" className="Logo-img-account rounded" />
							<button className="closing-btn">
								<NavLink to={`/whishlist/personal`} style={{ textDecoration: "none", color: "black" }}>
									<CloseIcon fontSize="large" />
								</NavLink>
							</button>
						</div>
					</Box>

					<Box sx={{ mt: 2, mx: 10, mb: 2 }}>
						<h4 style={{ textAlign: "center", marginBottom: "2rem" }}>Edit Profile</h4>
						<Box className="box-styling" sx={{ px: 1, py: 0.8 }}>
							<div className="row">
								<div className="col-8" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
									<img src={InfoImage} style={{ marginRight: 2 }} />
									<span>My Information</span>
								</div>
								<div className="col-4">
									<NavLink to={`/info`}>
										<button className="redirect-btn">
											<ArrowForwardIosIcon sx={{ color: "gray" }} />
										</button>
									</NavLink>
								</div>
							</div>
						</Box>

						<Box className="box-styling" sx={{ px: 1, py: 0.8 }}>
							<div className="row">
								<div className="col-8" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
									<img src={ScurityIcon} style={{ marginRight: 2 }} />
									<span>Security</span>
								</div>
								<div className="col-4">
									<NavLink to={`/security`}>
										<button className="redirect-btn">
											<ArrowForwardIosIcon sx={{ color: "gray" }} />
										</button>
									</NavLink>
								</div>
							</div>
						</Box>
					</Box>
				</Box>
			</Container>
		</div>
	);
}
