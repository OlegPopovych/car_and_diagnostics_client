import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListSubheader from '@mui/material/ListSubheader';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { TextField } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import { useDispatch, useSelector } from 'react-redux';

import { selectToken, setToken } from '../store/token_slice';
import { carCreated } from '../store/cars_slice';
import { useState } from "react";

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 610,
	height: 620,
	bgcolor: 'rgba(255, 255, 255, 1)',
	borderRadius: "5px",
	p: 4,
	display: 'flex',
	flexDirection: "column",
	justifyContent: "flex-start",
	alignItems: "center"
};

const CarModal = () => {

	const token = useSelector(selectToken);

	const [vin, setVin] = useState('');
	const [carNumber, setCarNumber] = useState('');
	const [description, setDescription] = useState('');
	const [model, setModel] = useState('');
	const [group, setGroup] = useState('');

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState('');

	const dispatch = useDispatch();

	const formSubmitHandler = (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		const newCar = { _id: uuidv4(), vin, carNumber, description, model, group };
		console.log(newCar);

		setError("");

		const genericErrorMessage = "Something went wrong! Please try again later.";

		fetch(
			process.env.REACT_APP_API_ENDPOINT + "cars/createnew", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(newCar),
		})
			.then(async (response) => {
				setIsSubmitting(false);
				if (!response.ok) {
					setError(genericErrorMessage);
					if (response.status === 400) {
						setError("Error inserting matches!");
					} else if (response.status === 401) {
						// setError("Invalid email and password combination.");
					} else {
						// setError(genericErrorMessage);
					}

					// const origin = location.state?.from?.pathname || '/';
					// navigate(origin);
				} else {
					console.log(response);
					handleSuccessMessage();

					// const data = await response.json();

					// dispatch(setToken(data.token));

					// const origin = location.state?.from?.pathname || '/';
					// navigate(origin);
				}
			})
			.then(
				dispatch(carCreated(newCar)),
				setVin(''),
				setCarNumber(''),
				setDescription(""),
				setModel(""),
				setGroup(""),
			)
			.catch((error) => {
				setIsSubmitting(false);
				console.log(error)
				setError(genericErrorMessage);
			});

	}

	const handleVinChange = (event) => {
		setVin(event.target.value);
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
		setSuccessMessage("Вітаю! Новий автомобіль збережено!");
		let SuccessMessage = setTimeout(() => setSuccessMessage(''), 3000);
	}

	return (
		<Box
			sx={style}
			component={'form'}
			onSubmit={formSubmitHandler}
		>
			{error && <Alert severity="error">{error}</Alert>}
			<Typography
				variant="h1"
				sx={{
					fontSize: "32px",
					fontWeight: "600",
					marginBottom: "20px"
				}} >
				Новий автомобіль
			</Typography>
			<TextField
				sx={{
					marginBottom: "27px"
				}}
				fullWidth
				size="small"
				label="Номер кузова"
				type="text"
				id="enterVin"
				value={vin}
				onChange={handleVinChange}

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
				helperText="Не обов'язково"
				value={carNumber}
				onChange={handleCarNumberChange}
			/>

			<FormControl sx={{ margin: "0px 0px 27px 0px" }} size="small" fullWidth>
				<InputLabel id="demo-select-small">Модель автомобіля</InputLabel>
				<Select
					labelId="demo-select-small"
					id="demo-select-small"
					value={model}
					label="Model"
					onChange={handleModelChange}
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
			/>

			<Button
				disabled={isSubmitting}
				variant="contained"
				type="submit"
				color="success"
			>
				ДОДАТИ АВТО
			</Button>
			{successMessage && <Alert severity="success">{successMessage}</Alert>}
		</Box>
	);
}

export default CarModal;