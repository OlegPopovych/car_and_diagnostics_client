import { useState } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Login from "./Login";
import Register from "./Register";

const Autorisation = () => {
	const [value, setValue] = useState('1');

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: '100%', typography: 'body1', margin: " auto auto", maxWidth: "400px" }}>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleChange} aria-label="lab API tabs example" variant="fullWidth">
						<Tab label="Login" value="1" />
						<Tab label="Register" value="2" />
					</TabList>
				</Box>
				<TabPanel value="1">{<Login />}</TabPanel>
				<TabPanel value="2">{<Register />}</TabPanel>
			</TabContext>
		</Box>
	)
};

export default Autorisation;