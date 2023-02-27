import CheckCircleIcon from '@mui/icons-material/CheckCircle';



const TabImage = () => {
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
		<CheckCircleIcon style={iconStyle}/>
		<img style={imgStyle} src="./615000.png"/>
		</>
		
	 );
}
 
export default TabImage;