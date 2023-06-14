import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
	Routes,
	Route,
	NavLink,
	Navigate,
	useNavigate,
	useLocation,
} from 'react-router-dom';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import { setToken, selectToken } from "../../../store/token_slice";

const Login = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const [userContext, setUserContext] = useContext(UserContext);
	const [showPassword, setShowPassword] = useState(false);

	const token = useSelector(selectToken);
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const location = useLocation();




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
				navigate('/');
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
			// setTimeout(verifyUser, 5* 60 * 1000);
		});
	}, [setToken]); //setToken





	useEffect(() => {
		verifyUser();
	}, [verifyUser]);

	const formSubmitHandler = (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError("");
		console.log({ email, password });

		const genericErrorMessage = "Something went wrong! Please try again later.";

		fetch(process.env.REACT_APP_API_ENDPOINT + "users/login", {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username: email, password }),
		})
			.then(async (response) => {
				setIsSubmitting(false);
				if (!response.ok) {
					if (response.status === 400) {
						setError("Please fill all the fields correctly!");
					} else if (response.status === 401) {
						setError("Invalid email and password combination.");
					} else {
						setError(genericErrorMessage);
					}

					const origin = location.state?.from?.pathname || '/';
					navigate(origin);
				} else {
					const data = await response.json();

					dispatch(setToken(data.token));

					const origin = location.state?.from?.pathname || '/';
					navigate(origin);
				}
			})
			.catch((error) => {
				setIsSubmitting(false);
				setError(genericErrorMessage);
			});
	};


	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => { event.preventDefault(); };

	return (
		<>
			{/* {error && <Callout intent="danger">{error}</Callout>} */}
			{/* <form onSubmit={formSubmitHandler} className="auth-form"> */}
			{error && <Alert severity="error">{error}</Alert>}
			<Box component="form" onSubmit={formSubmitHandler} className="auth-form">
				<div>

					<TextField
						fullWidth
						label="Login"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<FormControl variant="outlined" fullWidth sx={{ marginTop: "20px" }}>
						<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							type={showPassword ? 'text' : 'password'}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label="Password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</FormControl>
					<Button
						sx={{ marginTop: "20px" }}
						variant="contained"
						color="success"
						intent="primary"
						disabled={isSubmitting}
						text={`${isSubmitting ? "Signing In" : "Sign In"}`}
						fullWidth
						type="submit">
						Success
					</Button>
				</div>
			</Box>
		</>
	);
};

export default Login;
