import Car from "./Car";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import CarListHeader from "./CarListHeader";

import { useHttp } from '../../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { selectToken, setToken } from "../../../store/token_slice";
import { fetchCars } from "../../../store/cars_slice";
import { globalizedSelectors } from "../../../store/cars_slice";
// import { selectAll } from "../../../store/car_slice";

const CarList = () => {
	const { carsLoadingStatus } = useSelector(state => state.cars);
	console.log(carsLoadingStatus)
	// const carsLoadingStatus1 = useSelector(state => state);
	// console.log(carsLoadingStatus1)
	// const { cars } = useSelector(state => state.cars)
	const cars = useSelector(globalizedSelectors.selectAll);
	console.log(cars)
	const dispatch = useDispatch();
	// const { request } = useHttp();
	const token = useSelector(selectToken);

	useEffect(() => {
		console.log("start Effect")
		dispatch(fetchCars(token));
		console.log("finish Effect")
		// eslint-disable-next-line
	}, []);


	const renderCars = (data, status) => {
		console.log('item data', data)
		if (status === "loading") {
			return <div>Loading elements</div>
		} else if (status === "error") {
			return <div>Error loading</div>
		}
		if (data && data.length > 0) {
			console.log("data : ", data, data.length);
			return data.map(
				({ _id, ...props }) => {
					console.log("data map : ", props);
					return (
						<Car key={_id} {...props} />
					)
				})
		}
	}

	const elements = renderCars(cars, carsLoadingStatus);
	console.log('elements', elements)
	return (
		<>
			<CarListHeader />
			{/* <Car /> */}
			{elements}
		</>
	);
}

export default CarList;