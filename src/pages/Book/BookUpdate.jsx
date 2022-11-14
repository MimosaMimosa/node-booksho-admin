import dayjs from "dayjs";
import { useEffect, useReducer } from "react";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import BookForm from "./BookForm";

const BookUpdate = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const params = useParams();

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
			case "SHOW": {
				return { ...state, ...action.data };
			}
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(reducer, {
		input: {
			name: "",
			price: "",
			author: searchParams.get("authorId"),
			category: "",
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
		dispatch({
			data: URL.createObjectURL(e.target.files[0]),
			type: "FILE",
		});
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
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("image", state.file);
		formData.append("published_at", state.date.$d);

        console.log(state.input);
		for (let key in state.input) {
			formData.append(key, state.input[key]);
		}

		axios
			.post(
				`http://localhost:4000/api/v1/admin/books/${params.id}`,
				formData
			)
			.then((res) => {
				toast.success(res.data.message);
				navigate("/products");
			})
			.catch((error) => {
				dispatch({ data: error.response.data, type: "ERRORS" });
			});
	};

	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/v1/admin/books/${params.id}`)
			.then((res) => {
				const {
					author,
					category,
					published_at,
					name,
					price,
					image,
					description,
				} = res.data.book;
				dispatch({
					data: {
						input: {
							name,
							price,
							description,
							author: author._id,
							category: category._id,
						},
						date: dayjs(published_at),
                        file: image[0].url
					},
					type: "SHOW",
				});
			});

		axios
			.get("http://localhost:4000/api/v1/admin/categories")
			.then((res) => {
				dispatch({ data: res.data.categories, type: "CATEGORIES" });
			})
			.catch((error) => {
				console.log(error);
			});
	}, [dispatch, params.id]);

	return (
		<>
			<BookForm
				data={state}
				handleDate={handleDate}
				handleFile={handleFile}
				handleInput={handleInput}
				handleSubmit={handleSubmit}
			/>
		</>
	);
};

export default BookUpdate;
