import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./root.scss";
const Root = () => {
	return (
		<div className='root'>
			<Sidebar />
			<div className='rootContainer'>
				<Navbar />
                <Outlet/>
			</div>
		</div>
	);
};

export default Root;
