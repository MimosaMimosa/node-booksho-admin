import dayjs from "dayjs";
import { useEffect, useReducer, lazy, Suspense } from "react";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
const BookForm = lazy(() => import("./BookForm"));

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
			case "ERRORS":
				return { ...state, errors: action.data };
			case "SHOW":
				return { ...state, ...action.data };
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
		errors: {},
		image: "",
	});

	const handleDate = (data) => {
		dispatch({ data, type: "DATE" });
	};
	const handleFile = (e) => {
		dispatch({
			data: e.target.files[0],
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
		formData.append("name", state.input.name);
		formData.append("price", state.input.price);
		formData.append("author", state.input.author);
		formData.append("description", state.input.description);
		state.input.categories.forEach((c) => {
			formData.append("categories", c._id);
		});

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
				console.error(error);
				dispatch({ data: error.response.data, type: "ERRORS" });
			});
	};

	const handleChange = (e) => {
		const {
			target: { value },
		} = e;

		const checkedIds = value
			.map((v) => v._id)
			.filter(
				(_id, index, array) =>
					array.indexOf(_id) === array.lastIndexOf(_id)
			);

		const checked = value.filter((c) => checkedIds.includes(c._id));

		dispatch({
			data: {
				...state.input,
				categories: checked,
			},
			type: "INPUT",
		});
	};

	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/v1/admin/books/${params.id}`)
			.then((res) => {
				const {
					author,
					categories,
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
							categories,
						},
						image: image[0].url,
						date: dayjs(published_at),
					},
					type: "SHOW",
				});
			});
	}, [dispatch, params.id]);

	return (
		<>
			<Suspense>
				<BookForm
					data={state}
					handleDate={handleDate}
					handleFile={handleFile}
					handleInput={handleInput}
					handleSubmit={handleSubmit}
					handleChange={handleChange}
				/>
			</Suspense>
		</>
	);
};

export default BookUpdate;
