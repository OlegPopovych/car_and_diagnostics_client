import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';




const DiagnosticItem = ({ vin, carNumber, model, theNumberOfDiagnoses = '0', theDateOfTheLastDiagnosis = "" }) => {

	// const [open, setOpen] = useState(false);
	// const handleOpen = () => setOpen(true);
	// const handleClose = () => setOpen(false);

	return (
		<>
			<Grid container
				columns={8}
				sx={{
					height: "50px",
					alignItems: "center"
				}} >
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
						}}>12412424
					</Typography>
				</Grid>
				<Grid item
					lg={1}
					sx={{
						alignItems: "center"
					}} >
					<Typography
						sx={{
							fontSize: "14px",
							fontWeight: "400",
							padding: "0px 10px"
						}}>321323и
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
						}}>Мишка Гайка
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
						}}>01/01/2023
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
					</IconButton><IconButton
					// onClick={handleOpen}
					>
						<DeleteOutlineOutlinedIcon />
					</IconButton>
				</Grid>
			</Grid>
			<Box
				sx={{
					backgroundColor: "rgba(33, 33, 33, 0.08)",
					width: "100%",
					height: "1px"
				}} />
		</>
	);
}

export default DiagnosticItem;