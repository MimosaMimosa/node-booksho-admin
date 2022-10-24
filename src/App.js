import {
	createBrowserRouter,
	RouterProvider,
	Route,
	createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import New from "./pages/new/New";
import Single from "./pages/single/Single";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { DarkModeContext } from "./context/darkModeContext";
import { useContext } from "react";
import Root from "./pages/root/Root";
import CreateCategory from "./pages/category/CreateCategory";

function App() {
	const { darkMode } = useContext(DarkModeContext);
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<Root />}>
				<Route index element={<Home />}></Route>/
				<Route path='/login' element={<Login />}></Route>
				<Route path='/users'>
					<Route index element={<List />}></Route>
					<Route path=':userId' element={<Single />}></Route>
					<Route
						path='new'
						element={
							<New
								inputs={userInputs}
								title='Add New User'
								redirect={"/users"}
							/>
						}
					/>
				</Route>
				<Route path='products'>
					<Route index element={<List />} />
					<Route path=':productId' element={<Single />} />
					<Route
						path='new'
						element={
							<New
								inputs={productInputs}
								title='Add New Product'
							/>
						}
					/>
				</Route>
				<Route path='categories'>
					<Route path='create' element={<CreateCategory />} />
				</Route>
			</Route>
		)
	);
	return (
		<div className={darkMode ? "app dark" : "app"}>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
