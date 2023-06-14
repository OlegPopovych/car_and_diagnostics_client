const MainImage = ({ selectedIllustration }) => {

	const imgStyle = {
		width: '100%',
	};

	console.log('render MAIN image!!!!')
	if (selectedIllustration) {
		return (
			<>
				<img style={imgStyle} src={`http://localhost:8081/images/${selectedIllustration}.png `} />
				{/* <img style={imgStyle} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnU5DDC7KI1yPglJH5PpHqoDRJJlO3BUBaK-FZgp2Q&s" /> */}
			</>
		);
	} else {
		return (
			<>
				<h1 style={imgStyle}>Схема не обрана</h1>
			</>
		)
	}

}

export default MainImage;