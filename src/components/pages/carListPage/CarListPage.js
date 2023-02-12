import Header from "../../Header";
import CarList from "./CarList";
import Container from '@mui/material/Container';
import OperationBar from "./OperationBar";


const CarListPage = () => {
	return (
		<>
			{/* <Header /> */}
			<Container
				maxWidth="lg"
				sx={{
					width: "100%",
					display: "block",
					justifyContent: "space-between"
				}}>
				<OperationBar />
				<CarList />
			</Container>

			


		</>
	)
}

export default CarListPage;