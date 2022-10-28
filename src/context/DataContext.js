import { createContext, useReducer } from "react";
import DataContextReducer from "./DataContextReducer";

const initial = {
	authors: {
		data: [],
		totalPage:0,
	},
	books:{
		data:[],
		totalPage:0,
	}
};

export const DataContext = createContext(initial);

const DataContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(DataContextReducer,initial);
	return (
		<DataContext.Provider value={{ state, dispatch }}>
			{children}
		</DataContext.Provider>
	);
};

export default DataContextProvider;
