import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const ListHeader = () => {
	return (
		<>
			<Grid container columns={12}
				sx={{
					height: "50px",
					alignItems: "center",
					backgroundColor: "#EFEFF5"
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
						}}>Номер
					</Typography>
				</Grid>
				<Grid item
					lg={5}
					sx={{
						alignItems: "center"
					}} >
					<Typography
						sx={{
							fontSize: "14px",
							fontWeight: "600",
							padding: "0px 10px"
						}}>Назва
					</Typography>
				</Grid>
				<Grid item
					lg={3}
					sx={{
						alignItems: "center"
					}} >
					<Typography
						sx={{
							fontSize: "14px",
							fontWeight: "600",
							padding: "0px 10px"
						}}>Сторона
					</Typography>
				</Grid>
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
						}}>Опис
					</Typography>
				</Grid>
				<Grid item
					lg={2}
					sx={{
						alignItems: "center"
					}} >
					<Typography
						sx={{
							fontSize: "14px",
							fontWeight: "600",
							padding: "0px 10px"
						}}>Кількість
					</Typography>
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

export default ListHeader;