import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";

export default function Deposits({ recentDeposites }) {
	return (
		<React.Fragment>
			<Title>Total Income</Title>
			<Typography color="text.secondary">In {new Date().toLocaleString("en-US", { month: "long" })}</Typography>
			<Typography component="p" variant="h4">
				{recentDeposites?.toFixed(2)} EGP
			</Typography>
		</React.Fragment>
	);
}
