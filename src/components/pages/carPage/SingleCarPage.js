import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';
import Alert from '@mui/material/Alert';

import ListOfDiagnostic from './ListOfDiagnostic';

import React, { useCallback, useContext, useEffect, useState } from "react";
// import { UserContext } from "./context/UserContext";
import Loader from "../../../Loader";

import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken, setToken } from "../../../store/token_slice";
import { selectUser } from "../../../store/user_slice";
import { fetchCar } from "../../../store/car_slice";

import { globalizedSelector } from "../../../store/car_slice";

const SingleCarPage = () => {
	//form state
	const [disabledChange, setDisabledChange] = useState(true);
	const [vin1, setVin1] = useState('');
	const [carNumber, setCarNumber] = useState('');
	const [description, setDescription] = useState('');
	const [model, setModel] = useState('');
	const [group, setGroup] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState('');

	const token = useSelector(selectToken);
	const user = useSelector(selectUser);
	const { carLoadingStatus } = useSelector(state => state.cars);
	const allStore = useSelector(state => state);
	console.log(allStore)
	const car = useSelector(globalizedSelector.selectAll);

	const smth = useParams();
	console.log(smth);
	const { vin } = smth;

	// const dispatchsetUser = useDispatch(setUser);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log("start Effect")
		dispatch(fetchCar({ token, vin }));
		console.log("finish Effect")
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (car[0]) {
			console.log(`before render car data: ${car[0]}`)
			setVin1(car[0].vin);
			setCarNumber(car[0].carNumber);
			setModel(car[0].model);
			setGroup(car[0].group);
			setDescription(car[0].description);
		}
	}, [car])

	console.log(car[0]);

	const formSubmitHandler = (e) => {
		e.preventDefault();
		// setIsSubmitting(true);
		// const newCar = { _id: uuidv4(), vin, carNumber, description, model, group };
		// console.log(newCar);

		// setError("");

		// const genericErrorMessage = "Something went wrong! Please try again later.";

		// fetch(
		// 	process.env.REACT_APP_API_ENDPOINT + "cars/createnew", {
		// 	method: "POST",
		// 	credentials: "include",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		Authorization: `Bearer ${token}`,
		// 	},
		// 	body: JSON.stringify(newCar),
		// })
		// 	.then(async (response) => {
		// 		setIsSubmitting(false);
		// 		if (!response.ok) {
		// 			setError(genericErrorMessage);
		// 			if (response.status === 400) {
		// 				setError("Error inserting matches!");
		// 			} else if (response.status === 401) {
		// 				// setError("Invalid email and password combination.");
		// 			} else {
		// 				// setError(genericErrorMessage);
		// 			}

		// 			// const origin = location.state?.from?.pathname || '/';
		// 			// navigate(origin);
		// 		} else {
		// 			console.log(response);
		// 			handleSuccessMessage();

		// 			// const data = await response.json();

		// 			// dispatch(setToken(data.token));

		// 			// const origin = location.state?.from?.pathname || '/';
		// 			// navigate(origin);
		// 		}
		// 	})
		// 	.then(
		// 		dispatch(carCreated(newCar)),
		// 		setVin(''),
		// 		setCarNumber(''),
		// 		setDescription(""),
		// 		setModel(""),
		// 		setGroup(""),
		// 	)
		// 	.catch((error) => {
		// 		setIsSubmitting(false);
		// 		console.log(error)
		// 		setError(genericErrorMessage);
		// 	});

	}

	const handleVinChange = (event) => {
		setVin1(event.target.value);
	};
	const handleCarNumberChange = (event) => {
		setCarNumber(event.target.value);
	};
	const handleDescriptionChange = (event) => {
		setDescription(event.target.value);
	};

	const handleModelChange = (event) => {
		setModel(event.target.value);
	};
	const handleGroupChange = (event) => {
		setGroup(event.target.value);
	};

	const handleSuccessMessage = () => {
		setSuccessMessage("Вітаю! Дані оновлено!");
		let SuccessMessage = setTimeout(() => setSuccessMessage(''), 3000);
	}

	return (
		<>
			<Container
				maxWidth="lg"
				sx={{
					width: "100%",
					display: "block",
					justifyContent: "space-between"
				}}>


				<Box
					component={"div"}
					sx={{
						marginBottom: "42px"
					}}>

					<Box
						component={"div"}
						sx={{
							display: "flex",
							justifyContent: "space-between"
						}}>
						<Box component={"div"}
							sx={{
								display: "flex",
								justifyContent: "flex-start"
							}}>
							<Typography
								variant="h1"
								sx={{
									fontSize: "32px",
									fontWeight: "600",
									marginBottom: "22px"
								}} >
								{`Картка автомобіля ${car[0] ? car[0].carNumber : ""}`}
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "end"
							}}>
							<Button variant="outlined" startIcon={<AddIcon />}
							// onClick={handleOpen}
							>
								ДОДАТИ ДІАГНОСТИКУ
							</Button>
							<Typography
								sx={{
									marginTop: "5px",
									fontSize: "12px"
								}} >2 діагностики</Typography>
						</Box>
					</Box>
				</Box>

				<Grid container
					spacing={2}
					sx={{
						height: "59px",
						alignItems: "top"
					}}>
					{/* іНФОРМАЦІЯ ПРО АВТО */}
					<Grid item
						lg={4}
						sx={{
							alignItems: "center"
						}} >

						<Box
							// sx={style}
							component={'form'}
							onSubmit={formSubmitHandler}
						>
							{error && <Alert severity="error">{error}</Alert>}
							<TextField
								sx={{
									marginBottom: "27px"
								}}
								fullWidth
								size="small"
								label="Номер кузова"
								type="text"
								id="enterVin"
								value={vin1}
								onChange={handleVinChange}
								disabled={disabledChange}

							/>
							<TextField
								sx={{
									marginBottom: "27px"
								}}
								fullWidth
								size="small"
								label="Державний номер"
								type="text"
								id="carNumber"
								value={carNumber}
								onChange={handleCarNumberChange}
								disabled={disabledChange}
							/>

							<FormControl sx={{ margin: "0px 0px 27px 0px" }} size="small" fullWidth>
								<InputLabel id="demo-select-small">Модель автомобіля</InputLabel>
								<Select
									labelId="demo-select-small"
									id="demo-select-small"
									value={model}
									label="Model"
									onChange={handleModelChange}
									disabled={disabledChange}
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									<ListSubheader>Volksvagen</ListSubheader>
									<MenuItem value={"vwgolf6"}>Golf 6</MenuItem>
									<MenuItem value={"vwgolf7"}>Golf 7</MenuItem>
									<MenuItem value={"vwgolf8"}>Golf 8</MenuItem>
									<ListSubheader>Audi</ListSubheader>
									<MenuItem value={"audia5"}>A5</MenuItem>
									<MenuItem value={"audia7"}>A7</MenuItem>
								</Select>
							</FormControl>

							<FormControl sx={{ margin: "0px 0px 27px 0px" }} size="small" fullWidth>
								<InputLabel id="demo-select-small">Група підвіски</InputLabel>
								<Select
									labelId="demo-select-small"
									id="demo-select-small"
									value={group}
									label="Group"
									onChange={handleGroupChange}
									disabled={disabledChange}
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									<MenuItem value={10}>Golf 5</MenuItem>
									<MenuItem value={20}>Touareg</MenuItem>
									<MenuItem value={30}>Transporter T5</MenuItem>
									<MenuItem value={30}>Audi A6</MenuItem>
								</Select>
							</FormControl>

							<TextField
								sx={{
									marginBottom: "27px"
								}}
								fullWidth
								id="outlined-multiline-static"
								label="Додаткова інформація про автомобіль"
								multiline
								rows={3}
								value={description}
								onChange={handleDescriptionChange}
								disabled={disabledChange}
							/>

							<Button
								fullWidth
								disabled={isSubmitting}
								variant="contained"
								type="submit"
								color="success"
							>
								РЕДАГУВАТИ АВТО
							</Button>
							{successMessage && <Alert severity="success">{successMessage}</Alert>}
						</Box>

					</Grid>

					<Grid item
						lg={8}
						sx={{
							alignItems: "center"
						}} >
						<ListOfDiagnostic />
					</Grid>

				</Grid>


			</Container>
		</>


	);
};

export default SingleCarPage;




// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";


// const CarPage = () => {
// 	const { vin } = useParams();
// 	const navigate = useNavigate();

// 	const goBack = () => { navigate('/') }

// 	return (
// 		<>
// 			<button onClick={goBack}>BACK</button>
// 			<h1>{vin ? vin : "vin didn`t resive"}</h1>
// 		</>

// 	);
// }

// export default CarPage;