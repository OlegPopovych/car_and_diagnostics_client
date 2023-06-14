import { useDispatch, useSelector } from 'react-redux';
import { selectToken, setToken } from "./store/token_slice";
import { useCallback, useContext, useEffect, useState } from "react";

import {
	Routes,
	Route,
	NavLink,
	Navigate,
	useNavigate,
	useLocation,
} from 'react-router-dom';

import Autorisation from './components/pages/login/Autorisation';
import CarListPage from './components/pages/carListPage/CarListPage';
import HeaderLayout from './components/Header';
import SingleCarPage from './components/pages/carPage/SingleCarPage';
import TestHeaderLayout from './components/TextHeader';
import DiagnosticCreatePage from './components/pages/diagnosticCreatePage/DiagnosticCreatePage';
import TestHeader from './components/testHeader';

import Loader from "./Loader";
import Welcome from "./Welcome";

function App() {

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
				console.log('fetch!!!');
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
			// call refreshToken every 60 minutes to renew the authentication token.
			setTimeout(verifyUser, 60 * 60 * 1000);
		});
	}, [setToken]); //setToken

	useEffect(() => {
		verifyUser();
	}, [verifyUser]);

	/**
	 * Sync logout across tabs
	 */
	const syncLogout = useCallback((event) => {
		if (event.key === "logout") {
			// If using react-router-dom, you may call history.push("/")
			window.location.reload();
		}
	}, []);

	useEffect(() => {
		window.addEventListener("storage", syncLogout);
		return () => {
			window.removeEventListener("storage", syncLogout);
		};
	}, [syncLogout]);

	return (

		<Routes>
			<Route path="/" element={<ProtectedRoute><HeaderLayout /></ProtectedRoute>} >
				<Route index element={
					<ProtectedRoute>
						<CarListPage />
					</ProtectedRoute>
				} />
				<Route path="/cars/car/:vin" element={
					<ProtectedRoute>
						<SingleCarPage />
					</ProtectedRoute>
				} />
				<Route path="/cars/car/newdiagnostic/:group" element={
					<ProtectedRoute>
						<DiagnosticCreatePage />
					</ProtectedRoute>
				} />
			</Route >
			<Route path="/login" element={<Autorisation />} />
			<Route path="*" element={<NoMatch />} />
		</Routes >

		// <div className="wrapper">
		// 	<SingleCarPage />
		// </div>
	);
}

const NoMatch = () => {
	return <p>There's nothing here: 404!</p>;
};

const ProtectedRoute = ({ children }) => {
	const location = useLocation();
	const token = useSelector(selectToken);
	// const dispatch = useDispatch();

	// const verifyUser =  useCallback( async () => {
	// 	await fetch(process.env.REACT_APP_API_ENDPOINT + "users/refreshToken", {
	// 		method: "POST",
	// 		credentials: "include",
	// 		headers: { "Content-Type": "application/json" },
	// 	}).then(async (response) => {
	// 		if (response.ok) {
	// 			const data = await response.json();

	// 			dispatch(setToken(data.token));

	// 			// setUserContext((oldValues) => {
	// 			// 	return { ...oldValues, token: data.token };
	// 			// });
	// 		} else {
	// 			dispatch(setToken(null));
	// 			// setUserContext((oldValues) => {
	// 			// 	return { ...oldValues, token: null };
	// 			// });
	// 		}
	// 		// call refreshToken every 5 minutes to renew the authentication token.
	// 		setTimeout(verifyUser, 5 * 60 * 1000);
	// 	});
	// }, [setToken]); //setToken

	// useEffect(() => {
	// 	console.log('fetch***');
	// 	verifyUser();
	// }, [verifyUser]);









	if (!token) {
		return <Navigate to="/login" replace state={{ from: location }} />;
	}

	return children;
};

export default App;


// 	 <>
// 			<Routes>
// 				<Route path="/" element={<TestHeader />} >
// 					<Route index element={
// 						<DiagnosticCreatePage />
// 					} />
// 				</Route>
// 			</Routes> 



//  <TestHeader>
// 				<DiagnosticCreatePage />
// 			</TestHeader> 

// </> 
