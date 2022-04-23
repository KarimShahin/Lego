import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import axios from "axios";

function Shipper({ shipper, openNotification, removeShipper }) {
	const deleteShipper = () => {
		axios
			.delete("http://localhost:8080/dashboard/shippers", {
				data: { id: shipper._id },
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((res) => {
				if (res.data.body.deletedCount === 1) {
					removeShipper(shipper._id);
					openNotification(res.data.data);
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<Card sx={{ maxWidth: 345, position: "relative" }}>
			<CardHeader
				sx={{ width: "100%", justifyContent: "center" }}
				avatar={
					<Avatar
						sx={{
							bgcolor: red[500],
							width: "150px",
							height: "150px",
							fontSize: "4.3rem",
							justifyContent: "center",
						}}
						aria-label="recipe"
					>
						{shipper.email.split("")[0].toUpperCase()}
					</Avatar>
				}
			/>
			<CardContent sx={{ paddingBottom: 0 }}>
				<Typography gutterBottom variant="h5" align="center" component="div">
					{shipper.email}
				</Typography>
				<Typography gutterBottom variant="h5" align="center" component="div">
					{shipper.name.toUpperCase()}
				</Typography>
				<Typography align="center">Phone Number: +02 {shipper.phone_number}</Typography>
			</CardContent>
			<CardActions sx={{ justifyContent: "center" }}>
				<Button
					size="small"
					onClick={() => {
						deleteShipper();
					}}
				>
					Delete Shipper
				</Button>
			</CardActions>
		</Card>
	);
}

export default Shipper;
