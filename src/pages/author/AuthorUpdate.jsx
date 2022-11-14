import { useEffect, useReducer } from "react";

import dayjs from "dayjs";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AuthorForm from "./AuthorForm";

const AuthorUpdate = () => {
	const params = useParams();
	const navigate = useNavigate();
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
			case "IMAGE":
				return { ...state, image: action.data };
			case "SHOW":
				return { ...state, ...action.data };
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
			email: "",
			phone: "",
			country: "",
			address: "",
		},
		image: "",
	});

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
			.post(
				`http://localhost:4000/api/v1/admin/authors/${params.id}`,
				formData
			)
			.then((res) => {
				dispatch({ type: "ERRORS", data: {} });
				navigate("/authors");
				toast.success(res.data.message);
			})
			.catch((error) => {
				console.error(error);
				dispatch({ type: "ERRORS", data: error.response.data });
			});
	};

	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/v1/admin/authors/${params.id}`)
			.then((res) => {
				const {
					name,
					email,
					phone,
					country,
					image,
					date_of_birth,
					address,
				} = res.data.author;
				dispatch({
					type: "SHOW",
					data: {
						input: { name, email, phone, country, address },
						image,
					},
					date: dayjs(date_of_birth),
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}, [params.id]);

	return (
		<AuthorForm
			handleDate={handleDate}
			handleFile={handleFile}
			handleInput={handleInput}
			handleSubmit={handleSubmit}
			data={state}
			status={'Update'}
		/>
	);
};

export default AuthorUpdate;
