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




const DiagnosticItem = (props) => {

	// const [open, setOpen] = useState(false);
	// const handleOpen = () => setOpen(true);
	// const handleClose = () => setOpen(false);
	console.log(props);
	const { _id, vin, author, create_date, index } = props;
	const create_dateNew = new Date(create_date);
	console.log(create_dateNew);
	const date = `${create_dateNew.getDate()}/0${create_dateNew.getMonth() + 1}/${create_dateNew.getFullYear()} ${create_dateNew.getHours()}:${create_dateNew.getMinutes()}`;

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
						}}>
						{index}
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
						}}>
						{`${author.firstName} ${author.lastName}`}
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
						}}>
						{date}
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