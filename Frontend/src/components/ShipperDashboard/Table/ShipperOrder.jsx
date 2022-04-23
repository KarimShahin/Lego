import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import TableCell from "@mui/material/TableCell";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { TableRow, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button } from "@mui/material";
import axios from "axios";

export default function Order({ order }) {
	const [assignedState, setAssignedState] = useState(() => "");
	const [changeShipper, setChangeShipper] = useState(false);
	const [orderState, setOrderState] = useState(() => {
		return {
			isDelivered: order.isDelivered,
			isPending: order.isPending,
			isShipped: order.isShipped,
		};
	});
	const [isDelivered, setIsDelivered] = useState(() => order.isDelivered);
	const [isPending, setIsPending] = useState(() => order.isPending);
	const [isShipped, setIsShipped] = useState(() => order.isShipped);

	// console.log(assignedState);

	const submitShipper = () => {
		// setIsDelivered();
		// seIsPending();
		// setIsShipped(assignedState === "isShipped" ? true : false);
		console.log({
			isDelivered,
			isPending,
			isShipped,
		});
		axios
			.post("http://localhost:8080/userOrder", {
				id: order._id,
				isDelivered,
				isPending,
				isShipped,
			})
			.then((res) => {
				setChangeShipper(false);
				console.log(res);
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		if (assignedState === "isDelivered") {
			setIsDelivered(true);
			setIsShipped(false);
			setIsPending(false);
		} else if (assignedState === "isShipped") {
			setIsDelivered(false);
			setIsShipped(true);
			setIsPending(false);
		} else if (assignedState === "isPending") {
			setIsDelivered(false);
			setIsShipped(false);
			setIsPending(true);
		}
	}, [assignedState]);

	useEffect(() => {
		if (order.isDelivered) {
			setAssignedState("isDelivered");
		} else if (order.isShipped) {
			setAssignedState("isShipped");
		} else if (order.isPending) {
			setAssignedState("isPending");
		}
	}, []);
	// const changeOrderState = (value) => {
	//   if (value === "isDelivered") {
	//     setIsDelivered(true);
	//     setIsShipped(false);
	//     setIsPending(false);
	//   } else if (value === "isShipped") {
	//     setIsDelivered(false);
	//     setIsShipped(true);
	//     setIsPending(false);
	//   } else if (value === "isPending") {
	//     setIsDelivered(false);
	//     setIsShipped(false);
	//     setIsPending(true);
	//   }
	// };
	return (
		<TableRow>
			<TableCell>{order.order_date}</TableCell>
			<TableCell align="center">{order.user.email}</TableCell>
			<TableCell align="center">{Number(order.total_price)?.toFixed(2)} EGP</TableCell>

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
							value={assignedState}
							onChange={(e) => setAssignedState(e.target.value)}
						>
							<MenuItem value="" selected>
								<em>None</em>
							</MenuItem>

							<MenuItem value="isPending">Is Pending</MenuItem>
							<MenuItem value="isShipped">Is Shipped</MenuItem>
							<MenuItem value="isDelivered">Is Delivered</MenuItem>
						</Select>
						<FormHelperText sx={{ color: "red" }}></FormHelperText>
					</FormControl>
				) : (
					<>
						<span
							className="order-status-code"
							style={{
								backgroundColor: isDelivered
									? "green"
									: isShipped
									? "orange"
									: isPending
									? "grey"
									: "grey",
							}}
						></span>{" "}
						{isDelivered ? "Delivered" : isShipped ? "Shipped" : isPending ? "Pending" : ""}
					</>
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
						Set
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
