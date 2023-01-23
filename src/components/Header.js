import { Box } from "@mui/material";
import Container from '@mui/material/Container';
import Image from 'mui-image';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Fragment } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useContext, useEffect } from "react";

import Loader from "../Loader";

import { selectToken, setToken } from "../store/token_slice";
import { selectUser, setUser } from "../store/user_slice";

//AVATAR

function stringToColor(string) {
	let hash = 0;
	let i;
	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}
	let color = '#';
	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */
	return color;
}

function stringAvatar(name) {
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
	};
}

//AVATAR

const Header = () => {
	const token = useSelector(selectToken);
	const user = useSelector(selectUser);

	const dispatchsetUser = useDispatch(setUser);
	const dispatch = useDispatch();

	const fetchUserDetails = useCallback(() => {
		console.log('try to fetch user data');
		fetch(process.env.REACT_APP_API_ENDPOINT + "users/me", {
			method: "GET",
			credentials: "include",
			// Pass authentication token as bearer token in header
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}).then(async (response) => {
			if (response.ok) {
				const data = await response.json();
				console.log(data);
				dispatchsetUser(setUser(data));
				// setUserContext((oldValues) => {
				// 	return { ...oldValues, details: data };
				// });
			} else {
				if (response.status === 401) {
					// Edge case: when the token has expired.
					// This could happen if the refreshToken calls have failed due to network error or
					// User has had the tab open from previous day and tries to click on the Fetch button
					window.location.reload();
				} else {

					// setUserContext((oldValues) => {
					// 	return { ...oldValues, details: null };
					// });
				}
			}
		});
	}, [token]);   //setUserContext,

	useEffect(() => {
		// fetch only when user details are not present
		if (!user) {
			fetchUserDetails();
		}
	}, [user, fetchUserDetails]); //fetchUserDetails

	const logoutHandler = () => {
		fetch(process.env.REACT_APP_API_ENDPOINT + "users/logout", {
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}).then(async (response) => {
			dispatchsetUser(setUser(undefined));
			dispatch(setToken(null));
			// setUserContext((oldValues) => {
			// 	return { ...oldValues, details: undefined, token: null };
			// });
			window.localStorage.setItem("logout", Date.now());
		});
	};

	console.log(user);
	return user === null ? (
		"Error Loading User details"
	) : !user ? (
		<Loader />
	) : 	(
		<Box
			component="div"
			sx={{
				marginBottom: "22px"
			}}		>
			<Container
				maxWidth="lg"
				sx={{
					height: "52px",
					width: "100%",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center"
				}}>
				<Image
					src="./logo.png"
					height="38px"
					width="66.5px"
					fit="contain"
					duration={2000}
					easing="cubic-bezier(0.7, 0, 0.6, 1)"
					showLoading={false}
					errorIcon={true}
					shift={null}
					distance="100px"
					shiftDuration={900}
					bgColor="inherit" />
				<Box
					component="div"
					sx={{
						display: "flex",
						alignItems: "center"
					}}
				>
					<PopupState variant="popover" popupId="demo-popup-menu">
						{(popupState) => (
							<Fragment>
								{/* <Button variant="contained" {...bindTrigger(popupState)}>
									D
								</Button> */}
								<KeyboardArrowDownIcon {...bindTrigger(popupState)} />
								<Menu {...bindMenu(popupState)}>
									<MenuItem onClick={popupState.close}>Profile</MenuItem>
									<MenuItem onClick={popupState.close}>My account</MenuItem>
									<MenuItem onClick={logoutHandler}>Logout</MenuItem>
								</Menu>
							</Fragment>
						)}
					</PopupState>
					<Typography
						sx={{
							padding: "0px 10px",
							fontSize: "16px",
							fontWeight: "400",
						}}>{`${user.firstName} ${user.lastName}`}
					</Typography>
					<Avatar {...stringAvatar(`${user.firstName} ${user.lastName}`)}
						sx={{
							width: "38px",
							height: "38px"
						}} />
				</Box>
			</Container>
			<Box
				sx={{
					backgroundColor: "rgba(33, 33, 33, 0.08)",
					width: "100%",
					height: "1px"
				}} />
		</Box>
	);
}

export default Header;