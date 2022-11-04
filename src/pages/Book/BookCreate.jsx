import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	Grid,
	InputAdornment,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { grey } from "@mui/material/colors";
import axios from "axios";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { redirect, useSearchParams } from "react-router-dom";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { toast } from "react-toastify";
const BookCreate = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const data = {
		name: "",
		price: "",
		author: searchParams.get("authorId") || null,
		category: "",
		description: "",
	};
	const [value, setValue] = useState(dayjs(new Date()));
	const [file, setFile] = useState("");
	const [errors, setErrors] = useState({});
	const [input, setInput] = useState(data);
	const [categories, setCategories] = useState([]);

	const handleDate = (newValue) => {
		setValue(newValue);
	};
	const handleFile = (e) => {
		setFile(e.target.files[0]);
	};
	const handleInput = (e) => {
		setInput((prev) => {
			return { ...prev, [e.target.id || e.target.name]: e.target.value };
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("image", file);
		formData.append("published_at", value.$d);

		for (let key in input) {
			formData.append(key, input[key]);
		}

		axios
			.post("http://localhost:4000/api/v1/books", formData)
			.then((res) => {
				toast.success(res.data.message);
				redirect("/products");
			})
			.catch((error) => {
				setErrors(error.response.data);
			});
	};

	useEffect(() => {
		axios
			.get("http://localhost:4000/api/v1/categories")
			.then((res) => {
				setCategories(res.data.categories);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<>
			<Box p={3} mt={2}>
				<Grid container spacing={0}>
					<Grid item md={6}>
						<Paper elevation={2} sx={{ p: 3 }}>
							<Typography
								variant='h2'
								fontSize={20}
								mb={3}
								color='grey'
							>
								Create Book
							</Typography>
							<Grid container spacing={3}>
								<Grid item md={6}>
									<TextField
										fullWidth
										label='Name'
										placeholder='Name'
										id='name'
										value={input.name}
										onChange={handleInput}
										error={errors.name ? true : false}
										helperText={errors.name}
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<DriveFileRenameOutlineIcon />
												</InputAdornment>
											),
										}}
									/>
								</Grid>
								<Grid item md={6}>
									<TextField
										fullWidth
										placeholder='Price'
										label='Price'
										id='price'
										value={input.price}
										onChange={handleInput}
										error={errors.price ? true : false}
										helperText={errors.price}
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<AttachMoneyOutlinedIcon />
												</InputAdornment>
											),
										}}
									/>
								</Grid>
								<Grid item md={6}>
									<TextField
										fullWidth
										placeholder='AuthorId'
										label='AuthorId'
										id='author'
										value={input.author}
										onChange={handleInput}
										error={errors.author ? true : false}
										helperText={errors.author}
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<FolderSharedIcon />
												</InputAdornment>
											),
										}}
									/>
								</Grid>
								<Grid item md={6}>
									<FormControl fullWidth>
										<InputLabel id='category-label'>
											Category
										</InputLabel>
										<Select
											labelId='category'
											id='category'
											name='category'
											label='Categories'
											defaultValue=''
											onChange={handleInput}
										>
											{categories.map((category) => (
												<MenuItem
													value={category._id}
													key={category._id}
												>
													{category.name}
												</MenuItem>
											))}
										</Select>
										{errors.category ? (
											<FormHelperText error>
												{errors.category}
											</FormHelperText>
										) : null}
									</FormControl>
								</Grid>
								<Grid item md={6}>
									<LocalizationProvider
										dateAdapter={AdapterDayjs}
									>
										<Stack sx={{ width: "100%" }}>
											<MobileDatePicker
												fullWidth
												id='published_at'
												label='Published_at'
												inputFormat='MM/DD/YYYY'
												value={value}
												onChange={handleDate}
												renderInput={(params) => (
													<TextField {...params} />
												)}
											/>
										</Stack>
									</LocalizationProvider>
								</Grid>
								<Grid item md={6}>
									<FormControl fullWidth>
										<Button
											fullWidth
											component='label'
											size='small'
											variant='contained'
											sx={{
												height: "56px",
												display: "flex",
												color: "black",
												alignItems: "center",
												background: grey[200],
												"&:hover": {
													background: grey[100],
												},
											}}
										>
											<input
												type='file'
												hidden
												defaultValue={file}
												id='image'
												onChange={handleFile}
											/>
											<span>upload profile</span>
											<CloudUploadOutlinedIcon
												sx={{ mx: 1 }}
											/>
										</Button>
										{errors.image ? (
											<FormHelperText error>
												{errors.image}
											</FormHelperText>
										) : null}
									</FormControl>
								</Grid>
								<Grid item md={12}>
									<TextField
										multiline
										fullWidth
										required
										name='description'
										id='description'
										label='Description'
										onChange={handleInput}
										minRows={5}
										maxRows={5}
									/>
								</Grid>
								<Grid item md={12}>
									<Button
										onClick={handleSubmit}
										fullWidth
										variant='contained'
										color='primary'
										size='large'
										sx={{
											mt: 2,

											fontSize: "15px",
											fontWeight: "bold",
											textTransform: "capitalize",
										}}
									>
										Create
									</Button>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid
						item
						md={6}
						display='flex'
						justifyContent='center'
						alignItems='center'
					>
						<Box
							sx={{
								width: "270px",
								height: "394px",
								bgcolor: grey[300],
								alignItems: "center",
								justifyContent: "center",
								display: "flex",
							}}
						>
							{file ? (
								<img
									src={URL.createObjectURL(file)}
									alt='book'
									style={{
										width: "100%",
										height: "394px",
										objectFit: "cover",
									}}
								/>
							) : (
								<CameraAltIcon
									sx={{
										fontSize: "100px",
										color: grey[400],
									}}
								/>
							)}
						</Box>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default BookCreate;
