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
import { itemsSelector, removeItemFromCart } from '../store/cart_slice';
import { selectUser } from "../store/user_slice";
import { globalizedSelector } from "../store/car_slice";

import CartModalListItem from './pages/diagnosticCreatePage/CartModalListItem';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 1200,
	height: '95%',
	bgcolor: 'rgba(255, 255, 255, 1)',
	borderRadius: "5px",
	p: 4,
	display: 'flex',
	flexDirection: "column",
	justifyContent: "flex-start",
	alignItems: "center",
	overflowY: "scroll"
};

const CartsModal = () => {
	const user = useSelector(selectUser);
	const token = useSelector(selectToken);
	const cartsItems = useSelector(itemsSelector);
	const car = useSelector(globalizedSelector.selectAll);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState('');

	const dispatch = useDispatch();

	const formSubmitHandler = (e) => {
		e.preventDefault();
		const vin = car[0].vin;
		setIsSubmitting(true);
		const author = user;
		const newDiagnostic = { vin, author, cartsItems };

		setError("");

		const genericErrorMessage = "Something went wrong! Please try again later.";

		fetch(
			process.env.REACT_APP_API_ENDPOINT + "diagnostic/createnew", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(newDiagnostic),
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
			.catch((error) => {
				setIsSubmitting(false);
				console.log(error)
				setError(genericErrorMessage);
			});

	}


	const handleSuccessMessage = () => {
		setSuccessMessage("Вітаю! Діагностику збережено!");
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
				Обрані деталі
			</Typography>

			<>
				{/* <CartModalListItem /> */}
				{cartsItems.map((item, index) => {
					return (
						<>
							<CartModalListItem {...item} index={index + 1} />
						</>

						// <h1>{`Кількість: ${item.count}     Назва: ${item.name}     Опис: ${item.description}     ID : ${item.id}   GROUP : ${item.group}`}</h1>
					)
				})}
			</>










			<Button
				disabled={isSubmitting}
				variant="contained"
				type="submit"
				color="success"
			>
				ЗБЕРЕГТИ ДІАГНОСТИКУ
			</Button>
			{successMessage && <Alert severity="success">{successMessage}</Alert>}
		</Box>
	);
}

export default CartsModal;