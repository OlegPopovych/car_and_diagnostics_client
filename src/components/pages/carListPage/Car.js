import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';




const Car = ({ vin, carNumber, model, theNumberOfDiagnoses = '0', theDateOfTheLastDiagnosis = "" }) => {

	// const [open, setOpen] = useState(false);
	// const handleOpen = () => setOpen(true);
	// const handleClose = () => setOpen(false);

	return (
		<>
			<Grid container
				sx={{
					height: "59px",
					alignItems: "center"
				}}>
				<Grid item
					lg={3}
					sx={{
						alignItems: "center"
					}} >
					<Link to={`/cars/car/${vin}`}>{
						<Typography
							sx={{
								cursor: "pointer",
								fontSize: "14px",
								fontWeight: "400",
								padding: "0px 10px"
							}}>
							{vin}
						</Typography>}
					</Link>

				</Grid>
				<Grid item
					lg={2}
					sx={{
						alignItems: "center"
					}} >
					<Typography
						sx={{
							fontSize: "14px",
							fontWeight: "400",
							padding: "0px 10px"
						}}>{carNumber}
					</Typography>
				</Grid>
				<Grid item
					lg={2}
					sx={{
						alignItems: "center"
					}} >
					<Typography
						sx={{
							fontSize: "14px",
							fontWeight: "400",
							padding: "0px 10px"
						}}>{model}
					</Typography>
				</Grid>
				<Grid item
					lg={2}
					sx={{
						alignItems: "center"
					}} >
					<Typography
						sx={{
							fontSize: "14px",
							fontWeight: "400",
							padding: "0px 10px"
						}}>{theNumberOfDiagnoses}
					</Typography>
				</Grid>
				<Grid item
					lg={2}
					sx={{
						alignItems: "center"
					}} >
					<Typography
						sx={{
							fontSize: "14px",
							fontWeight: "400",
							padding: "0px 10px"
						}}>{theDateOfTheLastDiagnosis}
					</Typography>
				</Grid>
				<Grid item
					lg={1}
					sx={{
						alignItems: "center"
					}} >
					<IconButton
					// onClick={handleOpen}
					>
						<EditIcon />
					</IconButton>
				</Grid>
				<Box
					sx={{
						backgroundColor: "rgba(33, 33, 33, 0.08)",
						width: "100%",
						height: "1px"
					}} />
			</Grid>
			{/* 
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<CarModal />
			</Modal> */}
		</>
	);
}

export default Car;