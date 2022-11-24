import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormHelperText,
	Grid,
	InputAdornment,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
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
import { Stack } from "@mui/system";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { grey } from "@mui/material/colors";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { CameraAlt } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
			left: 532,
		},
	},
};
const BookForm = ({
	data,
	handleDate,
	handleFile,
	handleInput,
	handleSubmit,
	handleChange,
}) => {
	const { input, date, file, errors } = data;
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		axios
			.get("http://localhost:4000/api/v1/admin/categories")
			.then((res) => {
				setCategories(res.data.categories);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<>
			<Box p={3} mt={2} sx={{ overflow: "hidden" }}>
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
										value={input.author ?? ""}
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
									<FormControl
										fullWidth
									>
										<InputLabel id='demo-multiple-checkbox-label'>
											Categories
										</InputLabel>
										<Select
											labelId='demo-multiple-checkbox-label'
											id='demo-multiple-checkbox'
											multiple
											value={input.categories}
											onChange={handleChange}
											input={
												<OutlinedInput label='Categories' />
											}
											renderValue={(selected) =>
												selected
													.map((c) => c.name)
													.join(", ")
											}
											MenuProps={MenuProps}
										>
											{categories.map((category) => (
												<MenuItem
													key={category._id}
													value={category}
												>
													<Checkbox
														checked={
															input.categories.find(
																(c) =>
																	c._id ===
																	category._id
															)
																? true
																: false
														}
													/>
													<ListItemText
														primary={category.name}
													/>
												</MenuItem>
											))}
										</Select>
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
												value={date}
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
										defaultValue={input.description}
										required
										name='description'
										id='description'
										label='Description'
										onChange={handleInput}
										minRows={5}
										maxRows={5}
										error={
											errors.description ? true : false
										}
										helperText={errors.description}
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
							{file || data.image ? (
								<img
									src={
										file
											? URL.createObjectURL(file)
											: data.image
									}
									alt='book'
									style={{
										width: "100%",
										height: "394px",
										objectFit: "cover",
									}}
								/>
							) : (
								<CameraAlt
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

export default BookForm;
