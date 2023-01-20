import React, { useContext, useState } from "react";

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

import { useDispatch, useSelector } from 'react-redux';
import { selectToken, setToken } from "../../../store/token_slice";

const Register = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	//   const [userContext, setUserContext] = useContext(UserContext);
	const [showPassword, setShowPassword] = useState(false);

	const dispatch = useDispatch(setToken);

	const formSubmitHandler = (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError("");

		const genericErrorMessage = "Something went wrong! Please try again later.";

		fetch(process.env.REACT_APP_API_ENDPOINT + "users/signup", {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ firstName, lastName, username: email, password }),
		})
			.then(async (response) => {
				setIsSubmitting(false);
				if (!response.ok) {
					if (response.status === 400) {
						setError("Please fill all the fields correctly!");
					} else if (response.status === 401) {
						setError("Invalid email and password combination.");
					} else if (response.status === 500) {
						console.log(response);
						const data = await response.json();
						if (data.message) setError(data.message || genericErrorMessage);
					} else {
						setError(genericErrorMessage);
					}
				} else {
					const data = await response.json();
					dispatch(setToken(data.token));
					//  setUserContext((oldValues) => {
					//    return { ...oldValues, token: data.token };
					//  });
				}
			})
			.catch((error) => {
				setIsSubmitting(false);
				setError(genericErrorMessage);
			});
	};

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<>
			{error && <Alert severity="error">{error}</Alert>}

			<Box component="form" onSubmit={formSubmitHandler} className="auth-form">
				<div>

					<TextField
						fullWidth
						label="First Name"
						type="text"
						id="firstName"
						// placeholder="First Name"
						onChange={(e) => setFirstName(e.target.value)}
					/>

					<TextField
						sx={{ marginTop: "20px" }}
						fullWidth
						label="Last Name"
						type="text"
						id="lastName"
						onChange={(e) => setLastName(e.target.value)}
					/>

					<TextField
						sx={{ marginTop: "20px" }}
						fullWidth
						label="Email"
						id="email"
						type="email"
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
						text={`${isSubmitting ? "Registering" : "Register"}`}
						fill
						fullWidth
						type="submit">
						Success
					</Button>
				</div>
			</Box>

			{/* <form onSubmit={formSubmitHandler} className="auth-form">
				<FormGroup label="First Name" labelFor="firstName">
					<InputGroup
						id="firstName"
						placeholder="First Name"
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</FormGroup>
				<FormGroup label="Last Name" labelFor="firstName">
					<InputGroup
						id="lastName"
						placeholder="Last Name"
						onChange={(e) => setLastName(e.target.value)}
					/>
				</FormGroup>
				<FormGroup label="Email" labelFor="email">
					<InputGroup
						id="email"
						type="email"
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</FormGroup>
				<FormGroup label="Password" labelFor="password">
					<InputGroup
						id="password"
						placeholder="Password"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</FormGroup>
				<Button
					intent="primary"
					disabled={isSubmitting}
					text={`${isSubmitting ? "Registering" : "Register"}`}
					fill
					type="submit"
				/>
			</form> */}
		</>
	);
};

export default Register;
