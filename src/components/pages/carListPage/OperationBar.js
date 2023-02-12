import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';

import { useState, forwardRef } from "react";

import CarModal from '../../CarModal';

const OperationBar = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// const ModalWindow = forwardRef((props, ref) =>
	// 	<Modal
	// 		open={open}
	// 		onClose={handleClose}
	// 		aria-labelledby="modal-modal-title"
	// 		aria-describedby="modal-modal-description"
	// 	>
	// 		<CarModal />
	// 	</Modal>
	// );

	return (
		<Box
			component={"div"}
			sx={{
				marginBottom: "42px"
			}}>
			<Typography
				variant="h1"
				sx={{
					fontSize: "32px",
					fontWeight: "600",
					marginBottom: "22px"
				}} >
				Перелік автомобілів
			</Typography>
			<Box
				component={"div"}
				sx={{
					display: "flex",
					justifyContent: "space-between"
				}}>
				<Box component={"form"}
					sx={{
						display: "flex",
						justifyContent: "flex-start"
					}}>
					<TextField
						sx={{
							minWidth: "488px",
						}}
						size="small"
						label="Номер кузова або державний номер"
						type="text"
						id="venterVin"
						helperText="Exemple: WVWZZZ1KZAM635094"

					// placeholder="First Name"
					// onChange={(e) => setFirstName(e.target.value)}
					/>
					<Button variant="outlined" type='submit'
						sx={{
							padding: " 5px 5px",
							marginLeft: "15px",
							height: "40px",
							minWidth: "40px"
						}}>
						<SearchIcon />
					</Button>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "end"
					}}>
					<Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpen}>
						ДОДАТИ АВТО
					</Button>
					<Typography
						sx={{
							marginTop: "5px",
							fontSize: "12px"
						}} >1 300 автомобілів</Typography>
				</Box>
			</Box>
			{/* <Modal component={ModalWindow} />; */}
			<Modal disableEnforceFocus
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<>
					<CarModal />
				</>

			</Modal>
		</Box>


	);
}

export default OperationBar;