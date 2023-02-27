import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import Grid from '@mui/material/Grid';
import Image from 'mui-image';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { IconButton } from '@mui/material';


import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import TabImage from './TabImage';
import MainImage from './MainImage';
import ListHeader from './ListHeader';
import ListItem from './ListItem';


import { globalizedSelector } from "../../../store/car_slice";
import { selectToken, setToken } from "../../../store/token_slice";
import { selectUser } from "../../../store/user_slice";



const DiagnosticCreatePage = () => {
	const car = useSelector(globalizedSelector.selectAll);
	const token = useSelector(selectToken);
	const user = useSelector(selectUser);


	//forom exemple
	const AntTabs = styled(Tabs)({
		borderBottom: '1px solid #e8e8e8',
		'& .MuiTabs-indicator': {
			backgroundColor: '#1890ff',
		},
	});

	const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
		textTransform: 'none',
		minWidth: 0,
		[theme.breakpoints.up('sm')]: {
			minWidth: 0,
		},
		fontWeight: theme.typography.fontWeightRegular,
		marginRight: theme.spacing(1),
		color: 'rgba(0, 0, 0, 0.85)',
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		'&:hover': {
			color: '#40a9ff',
			opacity: 1,
		},
		'&.Mui-selected': {
			color: '#1890ff',
			fontWeight: theme.typography.fontWeightMedium,
		},
		'&.Mui-focusVisible': {
			backgroundColor: '#d1eaff',
		},
	}));

	const StyledTabs = styled((props) => (
		<Tabs
			{...props}
			TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
		/>
	))({
		'& .MuiTabs-indicator': {
			display: 'block',
			justifyContent: 'center',
			backgroundColor: 'transparent',
		},
		'& .MuiTabs-indicatorSpan': {
			height: "100%",

			width: '100%',
			backgroundColor: 'transparent',
			// borderRadius: "5px",
			// border: "1px solid #FA4A5F",

		},
		// '& .MuiTabs-indicator': {
		// 	display: 'flex',
		// 	justifyContent: 'center',
		// 	backgroundColor: 'transparent',
		// },
		// '& .MuiTabs-indicatorSpan': {
		// 	maxWidth: 40,
		// 	width: '100%',
		// 	backgroundColor: '#635ee7',
		// },
	});

	const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
		({ theme }) => ({
			padding: '0',
			height: '185px',
			width: "185px",
			margin: "6px",
			border: "2px solid #EFEFF5",
			borderRadius: "5px",
			textTransform: 'none',
			fontWeight: theme.typography.fontWeightRegular,
			fontSize: theme.typography.pxToRem(15),
			marginRight: theme.spacing(1),
			color: "#EFEFF5",
			'&.Mui-selected': {
				color: '#FA4A5F',
				borderRadius: "5px",
				border: "2px solid #FA4A5F",
			},
			'&.Mui-focusVisible': {
				backgroundColor: 'rgba(100, 95, 228, 0.32)',
			},
		}),
	);

	//  function CustomizedTabs() {
	const [value, setValue] = useState('0');

	const handleChange = (event, newValue) => {
		setValue(newValue);
		console.log(newValue)
	};
	//forom exemple





	return (
		<>
			<Container
				maxWidth="lg"
				sx={{
					width: "100%",
					backgroundColor: "#F9F9FB"
				}}>

				<Box
					component={"div"}
					sx={{
						marginBottom: "42px"
					}}>
					<Button sx={{ color: "#828282" }} startIcon={<ArrowBackIosIcon />}>
						НАЗАД
					</Button>
					<Box
						component={"div"}
						sx={{
							display: "flex",
							justifyContent: "space-between"
						}}>
						<Box component={"div"}
							sx={{
								display: "flex",
								justifyContent: "flex-start"
							}}>
							<Typography
								variant="h1"
								sx={{
									fontSize: "32px",
									fontWeight: "600",
								}} >
								{`Діагностика №123456  [${car[0] ? car[0].carNumber : "empty"}]`}
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								alignItems: "end"
							}}>


							<Link to={`/cars/car/newdiagnostic`}								>
								<Button variant="outlined"
								// onClick={handleOpen}
								>
									ПЕРЕГЛЯНУТИ ДІАГНОСТИКУ
								</Button>
							</Link>


							<Link to={`/cars/car/newdiagnostic`}>
								<Button disabled variant="contained" startIcon={<SaveIcon />}
									sx={{
										marginLeft: "20px"
									}}
								// onClick={handleOpen}
								>
									ЗБЕРЕГТИ
								</Button>
							</Link>
						</Box>
					</Box>
				</Box>



				<Grid container
				// spacing={2}
				// sx={{
				// 	alignItems: "center"
				// }}
				>
					<Grid item
						xs={5}
						sx={{
							height: "100%",
						}}
					>
						<Typography
							variant="h1"
							sx={{
								fontSize: "22px",
								fontWeight: "400",
								marginBottom: "17px"
							}} >
							Категорія деталей
						</Typography>
						<FormControl sx={{ margin: "0px 0px 27px 0px" }} size="small" fullWidth>
							<InputLabel id="demo-select-small">Група підвіски</InputLabel>
							<Select
								labelId="demo-select-small"
								id="demo-select-small"
								// value={group}
								label="Group"
							// onChange={handleGroupChange}
							>

								<MenuItem value={10}>Передня підвіска</MenuItem>
								<MenuItem value={20}>Задня підвіска</MenuItem>
								<MenuItem value={30}>Система гальм</MenuItem>
							</Select>
						</FormControl>
						<MainImage />
						{/* <Image
							src="./615000.png"
							// height="50%"
							width="100%"
							fit="contain"
							duration={0}
							// easing="cubic-bezier(0.7, 0, 0.6, 1)"
							showLoading={false}
							errorIcon={true}
							shift={null}
							distance="100px"
							shiftDuration={0}
							bgColor="inherit" /> */}
					</Grid>



					<Grid item
						xs={7}
						sx={{
							flexDirection: "column",
							justifyContent: "flex-start",
							alignItems: "flex-start",
							paddingLeft: "10px",

						}} >
						<Typography
							variant="h1"
							sx={{
								fontSize: "22px",
								fontWeight: "400",
								marginBottom: "17px"
							}} >
							Список деталей
						</Typography>
						<ListHeader />
						<Box
							sx={{
								flexDirection: "column",
								justifyContent: "flex-start",
								alignItems: "flex-start",
								overflowY: "scroll",
								maxHeight: "500px",
							}}>
							<ListItem />
							<ListItem />
							<ListItem />
							<ListItem />
							<ListItem />
							<ListItem />
							<ListItem />
							<ListItem />
							<ListItem />
							<ListItem />
							<ListItem />
							<ListItem />
							<ListItem />
							<ListItem />
							<ListItem />
							<ListItem />
							<ListItem />
						</Box>

					</Grid>

				</Grid>









				<Box sx={{ width: '100%' }}>


					<TabContext value={value}>

						{/* <Box
							sx={{
								width: "100%",
								display: "flex",
								justifyContent: "center"
							}}>
							<Box>
								<TabPanel value="0">Item One</TabPanel>
								<TabPanel value="1">Item Two</TabPanel>
								<TabPanel value="2">Item Three</TabPanel>
							</Box>
							<Box>
								<TabPanel value="0">Item One</TabPanel>
								<TabPanel value="1">Item Two</TabPanel>
								<TabPanel value="2">Item Three</TabPanel>
							</Box>
						</Box> */}



						<Box
							sx={{
								bgcolor: '#fff',
								boxShadow: "-2px 0px 10px rgba(0, 0, 0, 0.1)",
								borderRadius: "5px",
								marginTop: "10px"
							}}>
							<StyledTabs
								value={value}
								onChange={handleChange}
								aria-label="ant example"
								variant="scrollable"
								scrollButtons
								allowScrollButtonsMobile>
								<StyledTab value="0" label={<TabImage />} />
								<StyledTab value="1" label={<TabImage />} />
								<StyledTab value="2" label="Tab 4" />
								<StyledTab value="3" label={<TabImage />} />
								<StyledTab value="4" label="Tab 6" />
								<StyledTab value="5" label="Tab 7" />
								<StyledTab value="6" label="Tab 8" />
								<StyledTab value="7" label="Tab 9" />
							</StyledTabs>
						</Box>
					</TabContext>


				</Box>

			</Container>




		</>
	);
}

export default DiagnosticCreatePage;