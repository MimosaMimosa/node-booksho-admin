import dayjs from "dayjs";
import { useReducer } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import BookForm from "./BookForm";

const BookCreate = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const reducer = (state, action) => {
		switch (action.type) {
			case "DATE":
				return { ...state, date: action.data };
			case "FILE":
				return { ...state, file: action.data };
			case "INPUT":
				return { ...state, input: action.data };
			case "CATEGORIES":
				return { ...state, categories: action.data };
			case "ERRORS":
				return { ...state, errors: action.data };
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(reducer, {
		input: {
			name: "",
			price: "",
			author: searchParams.get("authorId"),
			categories: [],
			description: "",
		},
		date: dayjs(new Date()),
		file: "",
		categories: [],
		errors: {},
	});

	const handleDate = (data) => {
		dispatch({ data, type: "DATE" });
	};
	const handleFile = (e) => {
		dispatch({ data: e.target.files[0], type: "FILE" });
	};
	const handleInput = (e) => {
		dispatch({
			data: {
				...state.input,
				[e.target.id || e.target.name]: e.target.value,
			},
			type: "INPUT",
		});
	};

	const handleChange = (e) => {
		const {
			target: { value },
		} = e;
		dispatch({
			data: {
				...state.input,
				categories: value,
			},
			type: "INPUT",
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("image", state.file);
		formData.append("published_at", state.date.$d);
		formData.append("name", state.input.name);
		formData.append("price", state.input.price);
		formData.append("author", state.input.author);
		formData.append("description", state.input.description);
		state.input.categories.forEach((c) => {
			formData.append("categories", c._id);
		});

		axios
			.post("http://localhost:4000/api/v1/admin/books", formData)
			.then((res) => {
				toast.success(res.data.message);
				navigate("/products");
			})
			.catch((error) => {
				dispatch({ data: error.response.data, type: "ERRORS" });
			});
	};

	return (
		<>
			<BookForm
				data={state}
				handleDate={handleDate}
				handleFile={handleFile}
				handleInput={handleInput}
				handleSubmit={handleSubmit}
				handleChange={handleChange}
			/>
		</>
	);
};

export default BookCreate;
