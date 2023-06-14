import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Fragment } from 'react';
import { IconButton } from '@mui/material';
import {  styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteIcon from '@mui/icons-material/Delete';

import { useState } from 'react';
import { addItemToCart } from '../../../store/cart_slice';
import { useDispatch, useSelector } from 'react-redux';
import { itemsSelector, removeItemFromCart, updateItemFromCart } from '../../../store/cart_slice';
import { useEffect } from 'react';


const CartModalListItem = (props) => {
	const dispatch = useDispatch(addItemToCart);
	const cartsItems = useSelector(itemsSelector);

	const counterStyle = {
		height: "36px",
		border: "1px solid rgba(0, 0, 0, 0.12)",
		borderRadius: "5px",
		width: "52px",
		fontWeight: "400",
		fontSize: "14px"
	};
	const HtmlTooltip = styled(({ className, ...props }) => (
		<Tooltip {...props} classes={{ popper: className }} />
	))(({ theme }) => ({
		[`& .${tooltipClasses.tooltip}`]: {
			backgroundColor: '#f5f5f9',
			color: 'rgba(0, 0, 0, 0.87)',
			maxWidth: 220,
			fontSize: theme.typography.pxToRem(12),
			border: '1px solid #dadde9',
		},
	}));


	//https://github.com/mui/material-ui/blob/v5.12.2/docs/data/material/components/text-fields/CustomizedInputs.js
	const BootstrapInput = styled(InputBase)(({ theme }) => ({
		'& .MuiInputBase-input': {
			borderRadius: 4,
			position: 'relative',
			border: '1px solid #000',
			fontSize: 10,
			padding: '0px 0px',
			marginRight: '5px',
			marginLeft: '5px',
			height: '100%'
			// Use the system font instead of the default Roboto font.

		},
	}));




	console.log(`data in list\`s element: ${props.name}, ${props.group}`);

	 const { id,  group, positionInIllustration } = props;

	// const [checkedLokal, setCheckedLokal] = useState([false, false]);
	// const [countLokal, setCountLokal] = useState();
	// const [descriptionLokal, setDescriptionLokal] = useState('');

	const [checked, setChecked] = useState([false, false]);
	const [count, setCount] = useState(0);
	const [description, setDescription] = useState('');
	const [name, setName] =useState('');

	useEffect(() => {
		if (props.checked) {
			setChecked(props.checked);
		}
		setCount(props.count);
		setDescription(props.description);
		setName(props.name);
	}, []);

	// console.log(`checkboxes status from main: ${checked}`);
	// console.log(`counter from main: ${count}`);
	// console.log(`description from main: ${description}`);

	const handleChangeLeft = (event) => {
		setChecked([event.target.checked, checked[1]]);
	};

	const handleChangeRight = (event) => {
		setChecked([checked[0], event.target.checked]);
	};

	const handleChangeCounter = (e) => {
		const count = parseInt(e.target.value);
		setCount(count);
	}

	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
	}

	return (
		<>
			<Grid container columns={12}
				fullWidth
				sx={{
					height: "60px",
					alignItems: "center",
				}} >

				<Grid item
					lg={1}
					sx={{
						alignItems: "center"
					}} >
					<Typography
						sx={{
							fontSize: "14px",
							fontWeight: "600",
							padding: "0px 10px"
						}}>
						{props.index}
					</Typography>
				</Grid>

				<Grid item
					lg={3}
					sx={{
						alignItems: "center"
					}} >
					<HtmlTooltip
						title={
							<Fragment>
								<Typography
									sx={{
										// height: "60px",
										fontSize: "14px",
										fontWeight: "400",
										padding: "0px 10px",
									}}>
									{name}
								</Typography>


							</Fragment>
						}
					>
						<Typography
							noWrap={true}
							sx={{
								// height: "60px",
								fontSize: "14px",
								fontWeight: "400",
								padding: "0px 10px",
								// overflow: "hidden"
							}}>
							{name}
						</Typography>
					</HtmlTooltip>

				</Grid>

				<Grid item
					lg={2}
					sx={{
						alignItems: "center",
						paddingLeft: "10px"
					}} >

					<FormGroup
						sx={{
							display: "flex",
							flexDirection: "row"
						}}
					>
						<FormControlLabel
							control={
								<Checkbox
									checked={checked[0]}
									onChange={handleChangeLeft}
									sx={{
										color: "#B7B7C2",
										'&.Mui-checked': {
											color: "#FA4A5F",
										},
									}}
								/>}
							label="L;" />
						<FormControlLabel
							control={
								<Checkbox
									checked={checked[1]}
									onChange={handleChangeRight}
									sx={{
										color: "#B7B7C2",
										'&.Mui-checked': {
											color: "#FA4A5F",
										},
									}}
								/>} label="R." />
					</FormGroup>


				</Grid>

				<Grid item
					lg={4}
					sx={{
						display: "flex",
						alignItems: "center",
						flexDirection: "column",
						paddingX: "0px",
						paddingY: "0px"
					}} >
					<BootstrapInput
						fullWidth
						id="outlined-multiline-static"
						// label="Додаткова інформація про деталь"
						multiline
						rows={2}
						value={description}
					onChange={handleDescriptionChange}
					/>



				</Grid>

				<Grid item
					lg={2}
					sx={{
						display: "flex",
						alignItems: "center",
						// flexDirection: "column"
					}} >
					<>
						<input
							value={count}
							style={counterStyle}
							type="number"
							id="count"
							name="tentacles"
							min="0"
							max="99"
							onChange={handleChangeCounter}
						/>

					</>
					<IconButton size="large" aria-label="delete" sx={{ color: "#FA4A5F" }}
					 onClick={() => dispatch(updateItemFromCart({ id, name, checked, count, description, group, positionInIllustration }))}
					>
						<ChangeCircleIcon sx={{ fontSize: 30 }} />
						{/* <DoneIcon/> */}
					</IconButton>
					<IconButton size="large" aria-label="delete" sx={{ color: "#FA4A5F" }}
					onClick={() => dispatch(removeItemFromCart( id))}
					>
						<DeleteIcon sx={{ fontSize: 30 }} />
						{/* <DoneIcon/> */}
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

export default CartModalListItem;