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
import { Fragment, useContext } from "react";
import Root from "./pages/root/Root";
import CreateCategory from "./pages/category/CreateCategory";
import AuthorCreate from "./pages/author/AuthorCreate";
import AuthorTable from "./pages/author/AuthorTable";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BookCreate from "./pages/Book/BookCreate";

function App() {
	const { darkMode } = useContext(DarkModeContext);
	const theme = createTheme({
		palette: {
			primary: {
				main: "#6439ff",
			},
		},
	});
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Fragment>
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
					<Route path='/authors'>
						<Route index element={<AuthorTable />}></Route>
						<Route path='create' element={<AuthorCreate />}></Route>
					</Route>
					<Route path='/products'>
						<Route
							path='create'
							element={<BookCreate />}
						></Route>
					</Route>
					{/* <Route path='products'>
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
					</Route> */}
					<Route path='categories'>
						<Route path='create' element={<CreateCategory />} />
					</Route>
				
				</Route>
				<Route path='/admin/login' element={<Login />}></Route>
			</Fragment>
		)
	);
	return (
		<div className={darkMode ? "app dark" : "app"}>
			<ThemeProvider theme={theme}>
				<RouterProvider router={router} />
			</ThemeProvider>
		</div>
	);
}

export default App;
