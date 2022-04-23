import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import TableCell from "@mui/material/TableCell";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { TableRow, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button } from "@mui/material";
import axios from "axios";

export default function Order({ order, shippers }) {
	const [assignedShipper, setAssignedShipper] = useState("");
	const [changeShipper, setChangeShipper] = useState(false);
	const [orderState] = useState({
		isCanceled: order.isCanceled,
		isDelivered: order.isDelivered,
		isPending: order.isPending,
		isShipped: order.isShipped,
	});
	let config = {
		headers: {
			Authorization: "Bearer " + localStorage.getItem("token"),
		},
	};
	const submitShipper = () => {
		axios
			.put(
				"http://localhost:8080/dashboard/orders",
				{
					id: order._id,
					...orderState,
					shipper: assignedShipper,
				},
				config
			)
			.then((res) => {
				setChangeShipper(false);
			})
			.catch((err) => console.log(err));
	};
	// useEffect(()=>{

	// },[])
	return (
		<TableRow>
			<TableCell>{order.order_date}</TableCell>
			<TableCell>{order.user.email}</TableCell>
			<TableCell>{order.total_price ? Number(order.total_price).toFixed(2) : ""} EGP</TableCell>
			<TableCell align="center">
				<span
					className="order-status-code"
					style={{
						backgroundColor: orderState.isCanceled
							? "red"
							: orderState.isDelivered
							? "green"
							: orderState.isShipped
							? "orange"
							: orderState.isPending
							? "grey"
							: "grey",
					}}
				></span>{" "}
				{orderState.isCanceled
					? "Canceled"
					: orderState.isDelivered
					? "Delivered"
					: orderState.isShipped
					? "Shipped"
					: orderState.isPending
					? "Pending"
					: assignedShipper.length !== 0
					? "Pending"
					: "Not assigned"}
			</TableCell>

			<TableCell align="center" sx={{ minWidth: "150px" }}>
				{changeShipper ? (
					<FormControl sx={{ width: "100%", mt: 2 }}>
						<InputLabel id="updateCategory">Category</InputLabel>
						<Select
							fullWidth
							labelId="updateCategory"
							id="updateCategory"
							label="Category"
							name="updateCategory"
							value={assignedShipper}
							onChange={(e) => setAssignedShipper(e.target.value)}
						>
							<MenuItem value="" selected>
								<em>None</em>
							</MenuItem>
							{shippers.map((shipper, index) => (
								<MenuItem value={shipper._id} key={index}>
									{shipper.name}
								</MenuItem>
							))}
						</Select>
						<FormHelperText sx={{ color: "red" }}></FormHelperText>
					</FormControl>
				) : order.shipper ? (
					shippers.find((shipper) => shipper._id === order.shipper)?.name
				) : assignedShipper ? (
					shippers.find((shipper) => shipper._id === assignedShipper)?.name
				) : (
					"None"
				)}
			</TableCell>
			<TableCell align="center">
				{changeShipper && (
					<Button
						variant="outlined"
						startIcon={<CheckIcon color="success" />}
						onClick={submitShipper}
						sx={{ marginRight: "5px" }}
					>
						Assign
					</Button>
				)}
				<Button
					variant="outlined"
					startIcon={<ModeEditIcon color="primary" />}
					onClick={() => setChangeShipper(!changeShipper)}
				>
					{changeShipper ? "Cancel" : "Change"}
				</Button>
			</TableCell>
		</TableRow>
	);
}
