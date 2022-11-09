import { Box } from "@mui/material";
const PageNotFound = () => {
	return (
		<Box
			sx={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<img src='./assets/errors/404.svg' alt='404' width='40%' />
		</Box>
	);
};

export default PageNotFound;
