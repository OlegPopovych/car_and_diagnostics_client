// import { Card, Tab, Tabs } from "@blueprintjs/core";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Autorisation from './components/pages/login/Autorisation';

import { useCallback, useContext, useEffect, useState } from "react";
// import { UserContext } from "./context/UserContext";
import Loader from "./Loader";
// import Login from "./components/pages/login/Login";
// import Register from "./Register";
import Welcome from "./Welcome";

import { useDispatch, useSelector } from 'react-redux';
import { selectToken, setToken } from "./store/token_slice";

function App() {
	// const [currentTab, setCurrentTab] = useState("login");
	const [value, setValue] = useState('1');
	// const [userContext, setUserContext] = useContext(UserContext);

	const dispatch = useDispatch();
	const token = useSelector(selectToken);

	const verifyUser = useCallback(() => {
		fetch(process.env.REACT_APP_API_ENDPOINT + "users/refreshToken", {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
		}).then(async (response) => {
			if (response.ok) {
				const data = await response.json();

				dispatch(setToken(data.token));

				// setUserContext((oldValues) => {
				// 	return { ...oldValues, token: data.token };
				// });
			} else {
				dispatch(setToken(null));
				// setUserContext((oldValues) => {
				// 	return { ...oldValues, token: null };
				// });
			}
			// call refreshToken every 5 minutes to renew the authentication token.
			setTimeout(verifyUser, 5 * 60 * 1000);
		});
	}, [setToken]);

	// useEffect(() => {
	// 	verifyUser();
	// }, [verifyUser]);

	/**
	 * Sync logout across tabs
	 */
	const syncLogout = useCallback((event) => {
		if (event.key === "logout") {
			// If using react-router-dom, you may call history.push("/")
			window.location.reload();
		}
	}, []);

	// useEffect(() => {
	// 	window.addEventListener("storage", syncLogout);
	// 	return () => {
	// 		window.removeEventListener("storage", syncLogout);
	// 	};
	// }, [syncLogout]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return token === null ? (
	<Autorisation />
		// <Box sx={{ width: '100%', typography: 'body1' }}>
		// 	<TabContext value={value}>
		// 		<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
		// 			<TabList onChange={handleChange} aria-label="lab API tabs example">
		// 				<Tab label="Login" value="1" />
		// 				<Tab label="Register" value="2" />
		// 			</TabList>
		// 		</Box>
		// 		<TabPanel value="1">{<Login />}</TabPanel>
		// 		<TabPanel value="2">{<Register />}</TabPanel>
		// 	</TabContext>
		// </Box>
		// <Card elevation="1">
		// 	<Tabs id="Tabs" onChange={setCurrentTab} selectedTabId={currentTab}>
		// 		<Tab id="login" title="Login" panel={<Login />} />
		// 		<Tab id="register" title="Register" panel={<Register />} />
		// 		<Tabs.Expander />
		// 	</Tabs>
		// </Card>
	) : token ? (
		<Welcome />
	) : (
		<Loader />
	);
}

export default App;
