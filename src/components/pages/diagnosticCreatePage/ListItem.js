import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Fragment } from 'react';
import { TextField } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';

import { useState } from 'react';
import { addItemToCart } from '../../../store/cart_slice';
import { useDispatch, useSelector } from 'react-redux';
import { itemsSelector } from '../../../store/cart_slice';


const ListItem = (props) => {
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

	console.log(`data in list\`s element: ${props.name}, ${props.group}`);

	const { id, name, positionInIllustration, group } = props;
	const [checked, setChecked] = useState([false, false]);
	const [count, setCount] = useState(0);
	const [description, setDescription] = useState('');

	console.log(`checkboxes status from main: ${checked}`);
	console.log(`counter from main: ${count}`);
	console.log(`description from main: ${description}`);

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

	const idSearcher = (cartsItems, id) => {
		const index = cartsItems.findIndex((item) => item.id === id);
		console.log(`INDEX: ${index} , ${name}`)
		if (index !== -1) {
			return "red";
		}
	}

	return (
		<>
			<Grid container columns={12}
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
						backgroundColor={() => idSearcher(cartsItems, id)}
						sx={{
							fontSize: "14px",
							fontWeight: "600",
							padding: "0px 10px"
						}}>
						{positionInIllustration}
					</Typography>
				</Grid>

				<Grid item
					lg={5}
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
									{props.name}
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
					lg={3}
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
					lg={1}
					sx={{
						display: "flex",
						alignItems: "center",
						flexDirection: "column"
					}} >
					<HtmlTooltip
						title={
							<Fragment>
								<TextField
									// sx={{
									// 	marginBottom: "27px"
									// }}
									fullWidth
									id="outlined-multiline-static"
									// label="Додаткова інформація про деталь"
									multiline
									rows={4}
									value={description}
									onChange={handleDescriptionChange}
								/>
							</Fragment>
						}
					>
						<DescriptionIcon />
						{/* <Typography
							// noWrap={true}
							sx={{
								// height: "60px",
								fontSize: "14px",
								fontWeight: "400",
								padding: "0px 10px",
								// overflow: "hidden"
							}}>
							Опис
						</Typography> */}
					</HtmlTooltip>



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
						onClick={() => dispatch(addItemToCart({ id, name, checked, count, description, group, positionInIllustration }))}
					>
						<AddIcon sx={{ fontSize: 30 }} />
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

export default ListItem;