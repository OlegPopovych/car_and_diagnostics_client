import CheckCircleIcon from '@mui/icons-material/CheckCircle';



const TabImage = ({ illustration, handleSelectedIllustration }) => {
	console.log(`illustration in Tab ${illustration}`);
	const iconStyle = {
		position: "absolute",
		right: "8px",
		top: "9px"
	};
	const imgStyle = {
		width: '100%',
	};
	console.log('render tab image!!!!')

	return (
		<>
			<CheckCircleIcon style={iconStyle} />
			<img style={imgStyle} src={`http://localhost:8081/images/${illustration}.png`}
				onClick={() => handleSelectedIllustration(illustration)}
			/>
		</>

	);
}

export default TabImage;