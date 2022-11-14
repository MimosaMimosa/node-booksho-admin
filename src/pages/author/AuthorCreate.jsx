import dayjs from "dayjs";
import { useReducer } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import AuthorForm from "./AuthorForm";
import { useNavigate } from "react-router-dom";
const AuthorCreate = () => {
	const reducer = (state, action) => {
		switch (action.type) {
			case "FILE":
				return { ...state, file: action.data };
			case "ERRORS":
				return { ...state, errors: action.data };
			case "DATE":
				return { ...state, date: action.data };
			case "INPUT":
				return { ...state, input: action.data };
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(reducer, {
		date: dayjs(new Date()),
		file: "",
		errors: {},
		input: {
			name: "",
			email: "example@gmail.com",
			phone: "09792954102",
			country: "USA",
			address: "New York",
			password:'password'
		},
	});

	const navigate = useNavigate();

	const handleDate = (data) => {
		dispatch({ type: "DATE", data });
	};
	const handleFile = (e) => {
		dispatch({ type: "FILE", data: e.target.files[0] });
	};

	const handleInput = (e) => {
		dispatch({
			type: "INPUT",
			data: {
				...state.input,
				[e.target.id || e.target.name]: e.target.value,
			},
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("image", state.file);
		formData.append("date_of_birth", state.date.$d);

		for (let key in state.input) {
			formData.append(key, state.input[key]);
		}

		axios
			.post("http://localhost:4000/api/v1/admin/authors", formData)
			.then((res) => {
				dispatch({ type: "ERRORS", data: {} });
				toast.success(res.data.message);
				navigate("/authors");
			})
			.catch((error) => {
				if (error.code !== "ERR_CANCELED") {
					dispatch({ type: "ERRORS", data: error.response.data });
				}
			});
	};

	return (
		<AuthorForm
			handleSubmit={handleSubmit}
			handleInput={handleInput}
			handleFile={handleFile}
			handleDate={handleDate}
			data={state}
		/>
	);
};

export default AuthorCreate;
