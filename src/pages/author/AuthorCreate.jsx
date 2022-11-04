import {
	Avatar,
	Box,
	Button,
	FormHelperText,
	Grid,
	InputAdornment,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import { Stack } from "@mui/system";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import { grey } from "@mui/material/colors";
import HttpsIcon from "@mui/icons-material/Https";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Person2Icon from "@mui/icons-material/Person2";
import { toast } from "react-toastify";
const AuthorCreate = () => {
	const data = {
		name: "",
		email: "",
		phone: "",
		address: "",
		country: "",
		password: "",
	};
	const [value, setValue] = useState(dayjs(new Date()));
	const [file, setFile] = useState("");
	const [errors, setErrors] = useState(data);
	const [input, setInput] = useState(data);
	const navigate = useNavigate();

	const handleDate = (newValue) => {
		setValue(newValue);
	};
	const handleFile = (e) => {
		setFile(e.target.files[0]);
	};

	const handleInput = (e) => {
		setInput((prev) => {
			return { ...prev, [e.target.id]: e.target.value };
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("image", file);
		formData.append("date_of_birth", value.$d);

		for (let key in input) {
			formData.append(key, input[key]);
		}

		axios
			.post("http://localhost:4000/api/v1/admin/authors", formData)
			.then((res) => {
				setErrors(data);
				toast.success(res.data.message);
				navigate("/authors");
			})
			.catch((error) => {
				if (error.code !== "ERR_CANCELED") {
					setErrors(error.response.data);
				}
			});
	};

	return (
		<Box display='flex'>
			<Box sx={{ p: 3, width: "50%" }}>
				<Paper elevation={2} sx={{ p: 3 }}>
					<Typography variant='h2' fontSize={20} mb={3} color='grey'>
						Create Author
					</Typography>
					<Grid container spacing={3}>
						<Grid item md={6}>
							<TextField
								fullWidth
								label='Email'
								placeholder='mario@email.com'
								id='email'
								value={input.email}
								onChange={handleInput}
								error={errors.email ? true : false}
								helperText={errors.email}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<EmailOutlinedIcon />
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item md={6}>
							<TextField
								fullWidth
								label='Name'
								id='name'
								value={input.name}
								onChange={handleInput}
								error={errors.name ? true : false}
								helperText={errors.name}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<DriveFileRenameOutlineOutlinedIcon />
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item md={6}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<Stack sx={{ width: "100%" }}>
									<MobileDatePicker
										fullWidth
										id='date_of_birth'
										label='Date of birth'
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
							<TextField
								fullWidth
								placeholder='Mario'
								label='Phone'
								id='phone'
								value={input.phone}
								onChange={handleInput}
								error={errors.phone ? true : false}
								helperText={errors.phone}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<PhoneAndroidOutlinedIcon />
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item md={6}>
							<TextField
								fullWidth
								placeholder='New York'
								label='Address'
								id='address'
								value={input.address}
								onChange={handleInput}
								error={errors.address ? true : false}
								helperText={errors.address}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<LocationOnOutlinedIcon />
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item md={6}>
							<TextField
								fullWidth
								placeholder='USA'
								label='Country'
								id='country'
								value={input.country}
								onChange={handleInput}
								error={errors.country ? true : false}
								helperText={errors.country}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<FlagOutlinedIcon />
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item md={6}>
							<TextField
								type='password'
								fullWidth
								placeholder='password'
								label='Password'
								id='password'
								value={input.password}
								onChange={handleInput}
								error={errors.password ? true : false}
								helperText={errors.password}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<HttpsIcon />
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item md={6}>
							<Button
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
								fullWidth
							>
								<input
									type='file'
									hidden
									id='image'
									onChange={handleFile}
								/>
								<span>upload profile</span>
								<CloudUploadOutlinedIcon sx={{ mx: 1 }} />
							</Button>
							{errors.image ? (
								<FormHelperText error>
									{errors.image}
								</FormHelperText>
							) : null}
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
									pt: "13px",
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
			</Box>
			<Box
				sx={{
					p: 3,
					width: "50%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Avatar
					sx={{ width: "300px", height: "300px" }}
					src={file ? URL.createObjectURL(file) : null}
				>
					<Person2Icon sx={{ fontSize: "200px" }} />
				</Avatar>
			</Box>
		</Box>
	);
};

export default AuthorCreate;
