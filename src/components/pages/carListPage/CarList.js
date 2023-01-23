import Car from "./Car";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const CarList = () => {
	return (
		<>
			<Grid container
				sx={{
					height: "50px",
					alignItems: "center",
					backgroundColor: "#EFEFF5"
				}} >
				<Grid
					lg={3}
					sx={{
						alignItems: "center"
					}} >
					<Typography
						sx={{
							fontSize: "14px",
							fontWeight: "600",
							padding: "0px 10px"
						}}>Номер кузова
					</Typography>
				</Grid>
				<Grid
					lg={2}
					sx={{
						alignItems: "center"
					}} >
					<Typography
						sx={{
							fontSize: "14px",
							fontWeight: "600",
							padding: "0px 10px"
						}}>Державний номер
					</Typography>
				</Grid>
				<Grid
					lg={2}
					sx={{
						alignItems: "center"
					}} >
					<Typography
						sx={{
							fontSize: "14px",
							fontWeight: "600",
							padding: "0px 10px"
						}}>Модель
					</Typography>
				</Grid>
				<Grid
					lg={2}
					sx={{
						alignItems: "center"
					}} >
					<Typography
						sx={{
							fontSize: "14px",
							fontWeight: "600",
							padding: "0px 10px"
						}}>Кількість діагностик
					</Typography>
				</Grid>
				<Grid
					lg={2}
					sx={{
						alignItems: "center"
					}} >
					<Typography
						sx={{
							fontSize: "14px",
							fontWeight: "600",
							padding: "0px 10px"
						}}>Остання діагностика
					</Typography>
				</Grid>
				<Grid
					lg={1}
					sx={{
						alignItems: "center"
					}} >
				</Grid>
			</Grid>
			<Box
				sx={{
					backgroundColor: "rgba(33, 33, 33, 0.08)",
					width: "100%",
					height: "1px"
				}} />
			<Car />
		</>
	);
}

export default CarList;