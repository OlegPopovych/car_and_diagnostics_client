import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import { TextField } from '@mui/material';

import CarModal from '../login/CarModal';

const Car = () => {

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<Grid container
				sx={{
					height: "59px",
					alignItems: "center"
				}}>
				<Grid
					lg={3}
					sx={{
						alignItems: "center"
					}} >
					<Typography
						sx={{
							cursor: "pointer",
							fontSize: "14px",
							fontWeight: "400",
							padding: "0px 10px"
						}}>WVWZZZ1KZAM635094
					</Typography>
				</Grid>
				<Grid
					lg={2}
					sx={{
						alignItems: "center"
					}} >
					<Typography
						sx={{
							fontSize: "14px",
							fontWeight: "400",
							padding: "0px 10px"
						}}>AT3535CI
					</Typography>
				</Grid>
				<Grid
					lg={2}
					sx={{
						alignItems: "center"
					}} >
					<Typography
						sx={{
							fontSize: "14px",
							fontWeight: "400",
							padding: "0px 10px"
						}}>Volkswagen Passat B8
					</Typography>
				</Grid>
				<Grid
					lg={2}
					sx={{
						alignItems: "center"
					}} >
					<Typography
						sx={{
							fontSize: "14px",
							fontWeight: "400",
							padding: "0px 10px"
						}}>123
					</Typography>
				</Grid>
				<Grid
					lg={2}
					sx={{
						alignItems: "center"
					}} >
					<Typography
						sx={{
							fontSize: "14px",
							fontWeight: "400",
							padding: "0px 10px"
						}}>21/01/2023
					</Typography>
				</Grid>
				<Grid
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