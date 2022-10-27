import {
	Avatar,
	Box,
	Button,
	FilledInput,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Paper,
	Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import "./login.scss";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { blue } from "@mui/material/colors";
import AlternateEmailSharpIcon from "@mui/icons-material/AlternateEmailSharp";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
	const [values, setValues] = useState({
		amount: "",
		password: "",
		weight: "",
		weightRange: "",
		showPassword: false,
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<Container>
			<Box
				sx={{ height: "100vh" }}
				display='flex'
				justifyContent='center'
				alignItems='center'
			>
				<Box width='30%'>
					<Paper elevation={3} sx={{ p:3 }}>
						<Box
							component='div'
							textAlign='center'
							display='flex'
							justifyContent='center'
						>
							<Avatar sx={{ bgcolor: blue[500] }}>
								<LockOpenIcon />
							</Avatar>
						</Box>
						<Typography variant='h5' textAlign='center' mt={2}>
							Hello Again!
						</Typography>
						<FormControl
							sx={{ width: "100%", mt: 3 }}
							variant='outlined'
						>
							<InputLabel htmlFor='outlined-adornment-password'>
								Email
							</InputLabel>
							<OutlinedInput
								id='outlined-adornment-password'
								endAdornment={
									<InputAdornment position='end'>
										<AlternateEmailSharpIcon fontSize="small" />
									</InputAdornment>
								}
								label='Email'
							/>
						</FormControl>
						<FormControl
							sx={{ width: "100%", mt: 3 }}
							variant='outlined'
						>
							<InputLabel htmlFor='outlined-adornment-password'>
								Password
							</InputLabel>
							<OutlinedInput
								id='outlined-adornment-password'
								type={values.showPassword ? "text" : "password"}
								value={values.password}
								onChange={handleChange("password")}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={handleClickShowPassword}
											onMouseDown={
												handleMouseDownPassword
											}
											edge='end'
										>
											{values.showPassword ? (
												<VisibilityOff />
											) : (
												<Visibility />
											)}
										</IconButton>
									</InputAdornment>
								}
								label='Password'
							/>
						</FormControl>
						<Button
							variant='contained'
							sx={{ width: "100%", mt: 3,py:2 }}
						>
							Login
						</Button>
					</Paper>
				</Box>
			</Box>
		</Container>
	);
};

export default Login;
