import { createPortal } from "react-dom";

const Portal = ({ id, children }) => {
	return createPortal(children, document.getElementById(id));
};

export default Portal;
