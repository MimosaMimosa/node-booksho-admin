import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import {
	Avatar,
	Box,
	Button,
	IconButton,
	Pagination,
	Tooltip,
	Typography,
} from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { green, red } from "@mui/material/colors";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const AuthorTable = () => {
	const [authors, setAuthors] = useState({ data: [], totalPage: 0 });
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams({ page: 1 });

	const pagination = useMemo(
		() => (
			<Box mt={2} display='flex' justifyContent='end'>
				<Pagination
					defaultPage={parseInt(searchParams.get("page"))}
					count={authors.totalPage}
					onChange={(event, page) => {
						setSearchParams({ page });
					}}
				/>
			</Box>
		),
		[authors.totalPage]
	);

	const handleDelete = () => {};

	useEffect(() => {
		const CancelToken = axios.CancelToken;
		const source = CancelToken.source();
		axios
			.get(`http://localhost:4000/api/v1/authors${location.search}`, {
				cancelToken: source.token,
			})
			.then((res) => {
				setAuthors({
					data: res.data.authors,
					totalPage: res.data.totalPage,
				});
			})
			.catch((error) => {
				console.log(error);
			});

		return () => {
			source.cancel();
		};
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
							<TableCell>Name</TableCell>
							<TableCell align='right'>Email</TableCell>
							<TableCell align='right'>Profile</TableCell>
							<TableCell align='right'>Date of birth</TableCell>
							<TableCell align='right'>Phone</TableCell>
							<TableCell align='right'>Address</TableCell>
							<TableCell align='right'>Country</TableCell>
							<TableCell align='right'>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{authors.data.map((author) => (
							<TableRow
								key={author._id}
								sx={{
									"&:last-child td, &:last-child th": {
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
									<Box display='flex' justifyContent='end'>
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
									{author.address}
								</TableCell>
								<TableCell align='right'>
									{author.country}
								</TableCell>
								<TableCell align='right'>
									<Box>
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

export default AuthorTable;
