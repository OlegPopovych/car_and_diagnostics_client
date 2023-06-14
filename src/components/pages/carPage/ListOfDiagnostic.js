import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken, setToken } from "../../../store/token_slice";
import { selectUser } from "../../../store/user_slice";
import { globalizedSelector } from "../../../store/car_slice";

import DiagnosticHeader from './DiagnosticHeader';
import DiagnosticItem from './DiagnosticItem';







const ListOfDiagnostic = () => {
	const [diagnostics, setDiagnostics] = useState([]);
	const token = useSelector(selectToken);
	const user = useSelector(selectUser);
	const car = useSelector(globalizedSelector.selectAll);

	const getResource = async (vin, token) => {  // async говорить, що код асинххронний
		let res = await fetch(
			process.env.REACT_APP_API_ENDPOINT + `diagnostic/${vin}`, {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});             // авейт - каже зачекати поки від фетча не прийде результат

		if (!res.ok) {
			throw new Error(`Could not fetch ${vin}, status: ${res.status}`);
		}
		const diagnostics = await res.json();
		setDiagnostics(diagnostics);
		console.log(diagnostics);
		// return await res.json();
	};

	useEffect(() => {
		getResource(car[0].vin, token);
	}, []);

	return (
		<>
			<DiagnosticHeader />
			{diagnostics.map((item, index) => {
				return (
					<DiagnosticItem key={item._id} {...item} index={index + 1} />
				)
			})}

		</>
	);
}

export default ListOfDiagnostic;