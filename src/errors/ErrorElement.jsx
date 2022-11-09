import { Navigate, useRouteError } from "react-router-dom";

const ErrorElement = () => {
	const error = useRouteError();
	console.log(error);
	return <Navigate to='/404' />;
};

export default ErrorElement;
