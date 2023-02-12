import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';

import DiagnosticHeader from './DiagnosticHeader';
import DiagnosticItem from './DiagnosticItem';

const ListOfDiagnostic = () => {
	return (
		<>
			<DiagnosticHeader />
			<DiagnosticItem/>
		</>
	);
}

export default ListOfDiagnostic;