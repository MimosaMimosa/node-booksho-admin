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
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
	Avatar,
	Box,
	Button,
	IconButton,
	Modal,
	Pagination,
	Tooltip,
	Typography,
	useTheme,
} from "@mui/material";
import {
	Link,
	useLocation,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import WarningIcon from "@mui/icons-material/Warning";
import { blue, green, red } from "@mui/material/colors";
import { DataContext } from "../../context/DataContext";
import Portal from "../../components/modal/Portal";
import { toast } from "react-toastify";

const AuthorTable = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [fetch, setFetch] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
	const { state, dispatch } = useContext(DataContext);
	const [deleteId, setDeleteId] = useState(false);

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

	const handleDelete = () => {
		if (deleteId) {
			axios
				.delete(
					`http://localhost:4000/api/v1/admin/authors/${deleteId}`
				)
				.then((res) => {
					setDeleteId(false);
					toast.success(res.data.message);
					setFetch(!fetch)
				})
				.catch((error) => {
					toast.error(error.response.data.message);
					console.error(error);
				});
		}
	};

	useEffect(() => {
		const CancelToken = axios.CancelToken;
		const source = CancelToken.source();
		axios
			.get(
				`http://localhost:4000/api/v1/admin/authors${location.search}`,
				{
					cancelToken: source.token,
				}
			)
			.then((res) => {
				dispatch({
					type: "STORE_AUTHORS",
					authors: {
						data: res.data.authors,
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
	}, [location.search, searchParams,fetch]);

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
							Delete Author
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
								color="primary"
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
						Author Lists
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
								<TableCell align='right'>Name</TableCell>
								<TableCell align='right'>Email</TableCell>
								<TableCell align='right'>Profile</TableCell>
								<TableCell align='right'>
									Date of birth
								</TableCell>
								<TableCell align='right'>Phone</TableCell>
								<TableCell align='right'>Action</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{state.authors.data.length ? (
								state.authors.data.map((author) => (
									<TableRow
										key={author._id}
										sx={{
											"&:last-child td, &:last-child th":
												{
													border: 0,
												},
										}}
									>
										<TableCell component='th' scope='row'>
											{author._id}
										</TableCell>
										<TableCell align='right'>
											{author.name}
										</TableCell>
										<TableCell align='right'>
											{author.email}
										</TableCell>
										<TableCell align='right'>
											<Box
												display='flex'
												justifyContent='end'
											>
												<Avatar
													alt={author.name}
													src={`http://localhost:4000/${author.image.url}`}
												/>
											</Box>
										</TableCell>
										<TableCell align='right'>
											{dayjs(author.date_of_birth).format(
												"DD/MM/YYYY"
											)}
										</TableCell>
										<TableCell align='right'>
											{author.phone}
										</TableCell>
										<TableCell align='right'>
											<Box>
												<Tooltip title='create'>
													<IconButton
														onClick={() =>
															navigate(
																`/products/create?authorId=${author._id}`
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
													<Link to={author._id}>
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
													onClick={() => {
														setDeleteId(author._id);
													}}
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
				{/* {state.authors.data.length ? (
					<Box mt={2} display='flex' justifyContent='end'>
						<Pagination
							defaultPage={parseInt(searchParams.get("page"))}
							count={state.authors.totalPage}
							onChange={(event, page) => {
								setSearchParams({ page });
							}}
						/>
					</Box>
				) : null} */}
			</Box>
		</>
	);
};

export default AuthorTable;
