import React, { useEffect, useState } from "react";
import { Grid, Snackbar, Alert } from "@mui/material";
import User from "./User";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Tabs, Tab } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import allyprops from "../Tabs/allyprops";
import SwipeableViews from "react-swipeable-views";
import axios from "axios";
import TabPanel from "../Tabs/TabPanel";
import { useTheme } from "@mui/material/styles";
import BlockIcon from "@mui/icons-material/Block";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
function Users() {
	const theme = useTheme();
	const [users, setUsers] = useState([
		{ email: "batman@gotham.dc", name: "vengeance" },
		{ email: "batwoman@gotham.dc", name: "batwoman" },
		{ email: "homelander@theboys.paramount", name: "cocksucker" },
		{ email: "superman@metropolice.dc", name: "superman" },
	]);
	const [blockedUsers, setBlockedUsers] = useState([]);
	const [searchBlockedUsers, setSearchBlockedUsers] = useState([...blockedUsers]);
	const [searchOptions, setSearchOptions] = useState([...users]);

	/**** notifications */
	const [notification, setnotification] = useState(false);
	const [blockedUserStatus, setBlockedUserStatus] = useState("test");

	// karim

	const [page, setPage] = useState(0);

	// end karim

	const openNotification = (message) => {
		setBlockedUserStatus(message);
		setnotification(true);
	};

	const hideNotification = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setnotification(false);
	};

	/**** notifications */

	/********* tabs handlers******** */
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const handleChangeIndex = (index) => {
		setValue(index);
	};
	/********* tabs handlers******** */
	const search = (searchValue) => {
		if (value === 1) {
			let arr = blockedUsers.filter((user) => user.email.includes(searchValue));
			setSearchBlockedUsers(arr);
		} else if (value === 0) {
			let arr = users.filter((user) => user.email.includes(searchValue));
			setSearchOptions(arr);
		}
	};
	// on mount find in all users by isBlocked ? show them in blocked users tab

	const updateBlockedUsers = (blockedUser) => {
		setBlockedUsers([...blockedUsers, blockedUser]);
		let unBlockedUsers = users.filter((user) => user._id !== blockedUser._id);
		setUsers(unBlockedUsers);
	};

	const unBlockUser = (unBlockedUser) => {
		let arr = blockedUsers.filter((user) => {
			// console.log(user._id, unBlockedUser._id);
			return user._id !== unBlockedUser._id;
		});
		setBlockedUsers(arr);
		setUsers([...users, unBlockedUser]);
		// console.log(blockedUsers);
	};
	let config = {
		headers: {
			Authorization: "Bearer " + localStorage.getItem("token"),
		},
	};

	useEffect(() => {
		axios
			.get("http://localhost:8080/dashboard/users", config)
			.then((res) => {
				let users = res.data.users.filter((user) => !user.blocked);
				setUsers(users);
				// setUsers(res.data.users);
				let blocked = res.data.users.filter((user) => user.blocked);
				setBlockedUsers(blocked);
			})
			.catch((err) => console.log(err));

		axios
			.get("http://localhost:8080/dashboard/blacklist", config)
			.then((res) => {
				// setBlockedUsers(res.data.blacklist);
			})
			.catch((err) => console.log(err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setSearchOptions(users);
		setSearchBlockedUsers(blockedUsers);
	}, [users, blockedUsers]);
	console.log(page);
	return (
		<div className="users">
			<Tabs
				orientation="horizontal"
				value={value}
				variant="fullWidth"
				onChange={handleChange}
				aria-label="Horizontal tabs example"
				// sx={{ borderRight: 1, borderColor: "divider" }}
			>
				<Tab label="Users" icon={<GroupIcon color="primary" />} {...allyprops(0)} />
				<Tab label="Blocked Users" icon={<BlockIcon color="error" />} {...allyprops(1)} />
			</Tabs>
			<Box component="div" sx={{ my: 3 }}>
				<Autocomplete
					freeSolo
					id="usersSearch"
					disableClearable
					onKeyUp={(e) => search(e.target.value)}
					options={users.map((user) => user.email)}
					// options={["lego batman", "lego joker"]}
					sx={{ backgroundColor: "#fff" }}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Search input"
							InputProps={{
								...params.InputProps,
								type: "search",
							}}
						/>
					)}
				/>
			</Box>
			<SwipeableViews
				axis={theme.direction === "rtl" ? "x-reverse" : "x"}
				index={value}
				onChangeIndex={handleChangeIndex}
			>
				<TabPanel value={value} index={0}>
					<Grid container spacing={3}>
						{searchOptions.slice([6 * page], [6 * (page + 1)]).map((user) => (
							<Grid item md={6} xs={12} lg={4} key={user.email}>
								<User
									user={user}
									openNotification={openNotification}
									updateBlockedUsers={updateBlockedUsers}
									unBlockUser={unBlockUser}
								/>
							</Grid>
						))}
						{/* karim */}
						<Stack
							sx={{
								marginInline: "auto",
								marginBlockStart: "1rem",
								width: "100%",
								alignItems: "center",
								textAlign: "center",
							}}
						>
							<Pagination
								onChange={(e, p) => {
									setPage(p - 1);
								}}
								count={Math.ceil(searchOptions.length / 6)}
								showFirstButton
								showLastButton
							/>
						</Stack>
						{/* end karim */}
					</Grid>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Grid container spacing={3}>
						{searchBlockedUsers.length ? (
							searchBlockedUsers.map((user) => (
								<Grid item md={6} xs={12} lg={4} key={user.email}>
									<User
										user={user}
										openNotification={openNotification}
										unBlockUser={unBlockUser}
										updateBlockedUsers={updateBlockedUsers}
									/>
								</Grid>
							))
						) : (
							<Alert
								severity="warning"
								sx={{
									margin: "2rem 1rem",
									borderRadius: "10px",
									width: "100%",
								}}
							>
								There is no blocked users... Block some
							</Alert>
						)}
					</Grid>
				</TabPanel>
			</SwipeableViews>
			<Snackbar open={notification} autoHideDuration={3000} onClose={hideNotification} severity="success">
				<Alert onClose={hideNotification} severity="success" sx={{ width: "100%" }}>
					{blockedUserStatus}
				</Alert>
			</Snackbar>
		</div>
	);
}

export default Users;
