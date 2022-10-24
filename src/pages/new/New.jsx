import './new.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState } from 'react';

const New = ({ inputs, title }) => {
    const [file, setFile] = useState('');
    const [data, setData] = useState({
        name: '',
        name_and_surname: '',
        phone: '',
        address: '',
        country: '',
        email: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        name_and_surname: '',
        phone: '',
        address: '',
        country: '',
    });

    const handleChange = (e) => {
        const id = e.target.id;
        setData((prev) => {
            return { ...prev, [id]: e.target.value };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const { name, name_and_surname, phone, address, country } = data;
        formData.append('name', name);
        formData.append('name_and_surname', name_and_surname);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('country', country);
        formData.append('image', file);
    };

    return (
        <div className='new'>
            <Sidebar />
            <div className='newContainer'>
                <Navbar />
                <div className='top'>
                    <h1>{title}</h1>
                </div>
                <div className='bottom'>
                    <div className='left'>
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                            }
                            alt=''
                        />
                    </div>
                    <div className='right'>
                        <form onSubmit={handleSubmit}>
                            <div className='formInput'>
                                <label htmlFor='file'>
                                    Image:{' '}
                                    <DriveFolderUploadOutlinedIcon className='icon' />
                                </label>
                                <input
                                    type='file'
                                    id='file'
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: 'none' }}
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
