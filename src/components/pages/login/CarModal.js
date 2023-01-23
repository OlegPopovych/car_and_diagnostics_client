import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListSubheader from '@mui/material/ListSubheader';
import Button from '@mui/material/Button';

import { useState } from "react";
import { TextField } from '@mui/material';

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
	const [model, setModel] = useState('');
	const [group, setGroup] = useState('');

	const handleModelChange = (event) => {
		setModel(event.target.value);
	};
	const handleGroupChange = (event) => {
		setGroup(event.target.value);
	};

	return (
		<Box
			sx={style}
			omponent={'form'}
		// onSubmit={formSubmitHandler}
		>

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

			// placeholder="First Name"
			// onChange={(e) => setFirstName(e.target.value)}
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

			// placeholder="First Name"
			// onChange={(e) => setFirstName(e.target.value)}
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
			/>

			<Button
				variant="contained"
				type="submit"
				color="success"
			>
				ДОДАТИ АВТО
			</Button>
		</Box>
	);
}

export default CarModal;