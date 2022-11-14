import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import {
	Avatar,
	Box,
	Button,
	IconButton,
	Modal,
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
import { DataContext } from "../../context/DataContext";
import Portal from "../../components/modal/Portal";
import WarningIcon from "@mui/icons-material/Warning";
import { toast } from "react-toastify";

const BookTable = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
	const { state, dispatch } = useContext(DataContext);
	const [deleteId, setDeleteId] = useState(false);

	const handleDelete = () => {
		axios
			.delete(`http://localhost:4000/api/v1/admin/books/${deleteId}`)
			.then((res) => {
				toast.success(res.data.message);
				navigate("/products", { replace: true });
			})
			.catch((error) => {
				toast.error(error.response.data.message);
				console.error(error.response.data);
			})
			.finally(() => {
				setDeleteId(false);
			});
	};

	const style = {
		position: "absolute",
		top: "30%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		py: 2,
		px: 3,
		outline: "none",
		borderRadius: "5px",
	};

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
	}, [location.search, searchParams, location]);

	return (
		<>
			<Portal id='modal'>
				<Modal
					disablePortal
					open={deleteId ? true : false}
					onClose={() => setDeleteId(false)}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'
				>
					<Box sx={style}>
						<Typography
							id='modal-modal-title'
							variant='h6'
							component='h2'
							display='flex'
							alignItems='center'
							sx={{ fontWeight: "bold" }}
						>
							<WarningIcon
								sx={{
									color: red[600],
									fontSize: "30px",
									marginRight: "5px",
								}}
							/>
							Delete Book
						</Typography>
						<Typography
							id='modal-modal-description'
							sx={{ mt: 2 }}
							color='grey'
						>
							Duis mollis, est non commodo luctus, nisi erat
							porttitor ligula.
						</Typography>
						<Box display='flex' justifyContent='end'>
							<Button
								onClick={() => setDeleteId(false)}
								size='small'
								color='primary'
								variant='contained'
								sx={{ marginRight: "5px" }}
							>
								Cancel
							</Button>
							<Button
								onClick={handleDelete}
								size='small'
								color='error'
								variant='contained'
							>
								Delete
							</Button>
						</Box>
					</Box>
				</Modal>
			</Portal>
			<Box sx={{ p: 3 }}>
				<Box
					display='flex'
					justifyContent='space-between'
					mb={2}
					alignItems='center'
				>
					<Typography
						variant='h2'
						color='grey'
						sx={{ fontSize: "20px" }}
					>
						Book Lists
					</Typography>
					<Button
						variant='outlined'
						color='success'
						onClick={() => {
							navigate("/products/create");
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
								<TableCell align='right'>
									Published At
								</TableCell>
								<TableCell align='right'>Price</TableCell>
								<TableCell align='right'>Action</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{state.books.data.length ? (
								state.books.data.map((book) => (
									<TableRow
										key={book._id}
										sx={{
											"&:last-child td, &:last-child th":
												{
													border: 0,
												},
										}}
									>
										<TableCell component='th' scope='row'>
											{book._id}
										</TableCell>
										<TableCell align='right'>
											<Box
												display='flex'
												justifyContent='end'
											>
												<Link
													to={`/authors/${book.author._id}`}
												>
													<Tooltip
														title={book.author.name}
														sx={{
															cursor: "pointer",
														}}
													>
														<Avatar
															alt={
																book.author.name
															}
															src={
																book.author
																	.image.url
															}
														/>
													</Tooltip>
												</Link>
											</Box>
										</TableCell>
										<TableCell align='right'>
											{book.name}
										</TableCell>
										<TableCell align='right'>
											{book.category.name}
										</TableCell>
										<TableCell align='right'>
											{dayjs(book.published_at).format(
												"DD/MM/YYYY"
											)}
										</TableCell>
										<TableCell align='right'>
											{book.price} $
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
															sx={{
																color: blue[600],
															}}
														/>
													</IconButton>
												</Tooltip>
												<Tooltip title='view'>
													<Link to={book._id}>
														<IconButton>
															<EditIcon
																sx={{
																	color: green[600],
																}}
															/>
														</IconButton>
													</Link>
												</Tooltip>
												<Tooltip
													title='Delete'
													onClick={() =>
														setDeleteId(book._id)
													}
												>
													<IconButton>
														<DeleteIcon
															sx={{
																color: red[600],
															}}
														/>
													</IconButton>
												</Tooltip>
											</Box>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan='100%'>
										No Data
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				{state.books.data.length ? (
					<Box mt={2} display='flex' justifyContent='end'>
						<Pagination
							defaultPage={parseInt(searchParams.get("page"))}
							count={state.books.totalPage}
							onChange={(event, page) => {
								setSearchParams({ page });
							}}
						/>
					</Box>
				) : null}
			</Box>
		</>
	);
};

export default BookTable;
