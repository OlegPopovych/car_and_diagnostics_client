import { Button, Card } from "@blueprintjs/core";
import React, { useCallback, useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import Loader from "./Loader";

import { useDispatch, useSelector } from 'react-redux';
import { selectToken, setToken } from "./store/token_slice";
import { selectUser, setUser } from "./store/user_slice";

const Welcome = () => {
	const [userContext, setUserContext] = useContext(UserContext);

	const token = useSelector(selectToken);
	const user = useSelector(selectUser);

	const dispatchsetUser = useDispatch(setUser);
	const dispatch = useDispatch();

	const fetchUserDetails = useCallback(() => {
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
	}, [token, dispatchsetUser]);   //setUserContext,

	useEffect(() => {
		// fetch only when user details are not present
		if (!user) {
			fetchUserDetails();
		}
	}, [user, fetchUserDetails]); //fetchUserDetails

	const refetchHandler = () => {
		// set details to undefined so that spinner will be displayed and
		// fetchUserDetails will be invoked from useEffect
		dispatchsetUser(setUser(null));
		// setUserContext((oldValues) => {
		// 	return { ...oldValues, details: undefined };
		// });
	};

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

	// console.log(userContext);

	return user === null ? (
		"Error Loading User details"
	) : !user ? (
		<Loader />
	) : (
		<Card elevation="1">
			<div className="user-details">
				<div>
					<p>
						Welcome&nbsp;
						<strong>
							{user.firstName}
							{user.lastName &&
								" " + user.lastName}
						</strong>
						!
					</p>
					<p>
						Your reward points: <strong>{user.points}</strong>
					</p>
				</div>
				<div className="user-actions">
					<Button text="Refetch" intent="primary" onClick={refetchHandler} />
					<Button
						text="Logout"
						onClick={logoutHandler}
						minimal
						intent="primary"
					/>
				</div>
			</div>
		</Card>
	);
};

export default Welcome;
