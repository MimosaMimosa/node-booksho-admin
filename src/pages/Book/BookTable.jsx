import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext, useEffect, useMemo } from "react";
import axios from "axios";
import dayjs from "dayjs";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import {
	Avatar,
	Box,
	Button,
	IconButton,
	Pagination,
	Tooltip,
	Typography,
} from "@mui/material";
import {
	Link,
	useLocation,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { blue, green, red } from "@mui/material/colors";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { DataContext } from "../../context/DataContext";

const BookTable = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
	const { state, dispatch } = useContext(DataContext);

	const pagination = useMemo(
		() => (
			<Box mt={2} display='flex' justifyContent='end'>
				<Pagination
					defaultPage={parseInt(searchParams.get("page"))}
					count={state.books.totalPage}
					onChange={(event, page) => {
						setSearchParams({ page });
					}}
				/>
			</Box>
		),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[state.books.totalPage]
	);

	const handleDelete = () => {};

	useEffect(() => {
		const CancelToken = axios.CancelToken;
		const source = CancelToken.source();
		axios
			.get(`http://localhost:4000/api/v1/admin/books${location.search}`, {
				cancelToken: source.token,
			})
			.then((res) => {
				dispatch({
					type: "STORE_BOOKS",
					books: {
						data: res.data.books,
						totalPage: res.data.totalPage,
					},
				});
			})
			.catch((error) => {
				console.log(error);
			});
		return () => {
			source.cancel();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.search, searchParams]);

	return (
		<Box sx={{ p: 3 }}>
			<Box
				display='flex'
				justifyContent='space-between'
				mb={2}
				alignItems='center'
			>
				<Typography variant='h2' color='grey' sx={{ fontSize: "20px" }}>
					Book Lists
				</Typography>
				<Button
					variant='outlined'
					color='success'
					onClick={() => {
						navigate("/authors/create");
					}}
				>
					New
				</Button>
			</Box>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Id</TableCell>
							<TableCell align='right'>Author</TableCell>
							<TableCell align='right'>Name</TableCell>
							<TableCell align='right'>Category</TableCell>
							<TableCell align='right'>Published At</TableCell>
							<TableCell align='right'>Price</TableCell>
							<TableCell align='right'>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{state.books.data.map((book) => (
							<TableRow
								key={book._id}
								sx={{
									"&:last-child td, &:last-child th": {
										border: 0,
									},
								}}
							>
								<TableCell component='th' scope='row'>
									{book._id}
								</TableCell>
								<TableCell align='right'>
									<Box display='flex' justifyContent='end'>
										<Link
											to={`/authors/${book.author._id}`}
										>
											<Tooltip
												title={book.author.name}
												sx={{ cursor: "pointer" }}
											>
												<Avatar
													alt={book.author.name}
													src={`http://localhost:4000/${book.author.image.url}`}
												/>
											</Tooltip>
										</Link>
									</Box>
								</TableCell>
								<TableCell align='right'>{book.name}</TableCell>
								<TableCell align='right'>
									{book.category.name}
								</TableCell>
								<TableCell align='right'>
									{dayjs(book.published_at).format(
										"DD/MM/YYYY"
									)}
								</TableCell>
								<TableCell align='right'>
									{book.price}
								</TableCell>
								<TableCell align='right'>
									<Box>
										<Tooltip title='create'>
											<IconButton
												onClick={() =>
													navigate(
														`/products/create?authorId=${book._id}`
													)
												}
											>
												<MenuBookOutlinedIcon
													sx={{ color: blue[600] }}
												/>
											</IconButton>
										</Tooltip>
										<Tooltip title='view'>
											<IconButton>
												<RemoveRedEyeIcon
													sx={{ color: green[600] }}
												/>
											</IconButton>
										</Tooltip>
										<Tooltip
											title='Delete'
											onClick={handleDelete}
										>
											<IconButton>
												<DeleteIcon
													sx={{ color: red[600] }}
												/>
											</IconButton>
										</Tooltip>
									</Box>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{pagination}
		</Box>
	);
};

export default BookTable;
