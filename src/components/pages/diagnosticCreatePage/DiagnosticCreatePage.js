import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';


import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';

import TabImage from './TabImage';
import MainImage from './MainImage';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
import CartsModal from '../../CartsModal';


import { globalizedSelector } from "../../../store/car_slice";
import { selectToken, setToken } from "../../../store/token_slice";
import { selectUser } from "../../../store/user_slice";
import { catalogueSelector } from '../../../store/catalogue_slice';
import { fetchCatalogue } from '../../../store/catalogue_slice';
import { itemsSelector } from '../../../store/cart_slice';




const DiagnosticCreatePage = () => {
	const cartsItems = useSelector(itemsSelector);
	const catalogue = useSelector(catalogueSelector.selectAll);
	const token = useSelector(selectToken);
	const user = useSelector(selectUser);
	const car = useSelector(globalizedSelector.selectAll);
	const { catalogueLoadingStatus } = useSelector(state => state.catalogue);
	const dispatch = useDispatch();

	const [selectedGroup, setselectedGroup] = useState('frontParts');
	const [value, setValue] = useState('0');
	const [selectedIllustration, setSelectedIllustration] = useState('');
	const [diagnosticNumber, setDiagnosticNumber] = useState('error');

	//MODAL HANDLER
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const smth = useParams();
	console.log(smth);
	const { group } = smth;

	useEffect(() => {
		console.log("start Effect")
		dispatch(fetchCatalogue({ token, group }));
		createDiagnosticNumber();
		console.log("finish Effect")
		// eslint-disable-next-line
	}, []);

	console.log("каталог: ", catalogue);
	console.log("каталог статус: ", catalogueLoadingStatus)

	//forom exemple

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

	//  function CustomizedTabs() 
	const handleTabChange = (event, newValue) => {
		setValue(newValue);
		console.log(newValue)
	};

	const handleGroupChange = (event) => {
		setselectedGroup(event.target.value);
		setSelectedIllustration('');
		console.log(`new selected group: ${event.target.value}`);
		// console.log(`selected from catalogue ${catalogue[0].[event.target.value].illustrations}`)
		// console.log(catalogue[0].[event.target.value].illustrations) 
	};

	const handleSelectedIllustration = (data) => {
		setSelectedIllustration(data);
		console.log(`new SelectedIllustration: ${data}`);
		// console.log(`selected from catalogue ${catalogue[0].[event.target.value].illustrations}`)
		// console.log(catalogue[0].[event.target.value].illustrations) 
	};

	const createDiagnosticNumber = () => {
		if (!car[0]) return;
		const date = new Date();
		const vinSplice = car[0].vin.slice(-6);
		const min = date.getMinutes();
		const hh = date.getHours()
		console.log(vinSplice, date, `${vinSplice}/${hh}/${min}`);
		setDiagnosticNumber(`${vinSplice}/${hh}/${min}`);

	}


	const renderTabs = (data, status) => {
		console.log('таби data', data)
		if (status === "loading") {
			return <div>Loading elements</div>
		} else if (status === "error") {
			return <div>Error loading</div>
		}
		if (data && data.length > 0) {
			console.log("tabs : ", data, data.length);
			return data[0].[selectedGroup].illustrations.map(
				(illustration) => {
					console.log("renderTabs map : ", illustration);
					return (
						<StyledTab
							value={illustration}
							label={<TabImage illustration={illustration} handleSelectedIllustration={handleSelectedIllustration} />}
						/>
					)
				})
		}
	}

	const renderList = (data, selector) => {
		console.log(" renderList selector : ", selector);
		console.log(" renderList selectedGroup : ", selectedGroup);
		if (!selector) {
			return <div>Схему не обрано</div>
		}
		if (data && data.length > 0) {
			console.log("tabs : ", data, data.length);
			return data[0].[selectedGroup].[selector].map(
				(elem) => {
					console.log("renderTabs map : ", { ...elem });
					return (
						// <Car key={_id} {...props} />
						<ListItem {...elem} />
					)
				})
		}
	}

	const tabsElements = renderTabs(catalogue, catalogueLoadingStatus);
	const listElements = renderList(catalogue, selectedIllustration);



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
						<Modal disableEnforceFocus
							open={open}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description"
						>
							<>
								<CartsModal />
							</>

						</Modal>
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
								{`Діагностика №${diagnosticNumber} [${car[0] ? car[0].carNumber : "empty"}]`}
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								alignItems: "end"
							}}>


							{/* <Link to={`/cars/car/newdiagnostic`}								> */}
							<Button variant="outlined"
								onClick={handleOpen}
							>
								ПЕРЕГЛЯНУТИ ДІАГНОСТИКУ
							</Button>
							{/* </Link> */}


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
								value={selectedGroup}
								label="Group"
								onChange={handleGroupChange}
							>

								<MenuItem value={'frontParts'}>Передня підвіска</MenuItem>
								<MenuItem value={'rearParts'}>Задня підвіска</MenuItem>
								<MenuItem value={'brake'}>Система гальм</MenuItem>
							</Select>
						</FormControl>
						<MainImage selectedIllustration={selectedIllustration} />
						{/* <Image
							src="./logo.png"
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
						{/* <List/> */}
						<Box
							sx={{
								flexDirection: "column",
								justifyContent: "flex-start",
								alignItems: "flex-start",
								overflowY: "scroll",
								maxHeight: "500px",
							}}>
							{listElements}
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
								onChange={handleTabChange}
								aria-label="ant example"
								variant="scrollable"
								scrollButtons
								allowScrollButtonsMobile>
								{tabsElements}
							</StyledTabs>
						</Box>
					</TabContext>

				</Box>
				{/* <div>
					{cartsItems.map(item => {
						return (
							<h1>{`Кількість: ${item.count}     Назва: ${item.name}     Опис: ${item.description}     ID : ${item.id}`}</h1>
						)
					})}
				</div> */}
			</Container>




		</>
	);
}

export default DiagnosticCreatePage;