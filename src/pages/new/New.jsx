import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const New = ({ inputs, title, redirect }) => {
	const initalData = {};
	inputs.forEach((input) => {
		initalData[input.id] = "";
	});

	const [file, setFile] = useState("");
	const [data, setData] = useState(initalData);
	const [errors, setErrors] = useState(initalData);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const id = e.target.id;
		setData((prev) => {
			return { ...prev, [id]: e.target.value };
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		for (let key in data) {
			formData.append(key, data[key]);
		}
		formData.append("image", file);
		axios
			.post("http://localhost:4000/api/v1/users", formData)
			.then(() => {
				setData(initalData);
				navigate(redirect);
			})
			.catch((error) => {
				console.log(error);
				setErrors(error.response.data);
			});
	};

	return (
		<div className='new'>
			<div className='newContainer'>
				<div className='top'>
					<h1>{title}</h1>
				</div>
				<div className='bottom'>
					<div className='left'>
						<img
							src={
								file
									? URL.createObjectURL(file)
									: "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
							}
							alt=''
						/>
					</div>
					<div className='right'>
						<form onSubmit={handleSubmit}>
							<div className='formInput'>
								<label htmlFor='file'>
									Image:{" "}
									<DriveFolderUploadOutlinedIcon className='icon' />
								</label>
								<input
									type='file'
									id='file'
									onChange={(e) => setFile(e.target.files[0])}
									style={{ display: "none" }}
								/>
							</div>

							{inputs.map((input) => (
								<div className='formInput' key={input.id}>
									<label>{input.label}</label>
									<input
										id={input.id}
										value={data[input.id]}
										type={input.type}
										placeholder={input.placeholder}
										onChange={handleChange}
									/>
									<div className='error'>
										{errors[input.id]}
									</div>
								</div>
							))}
							<button type='submit'>Send</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default New;
