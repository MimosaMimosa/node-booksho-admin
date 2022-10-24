import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Chart from '../../components/chart/Chart';
import List from '../../components/table/Table';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Single = () => {
    const [user, setUser] = useState({});
    const params = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/v1/users/${params.userId}`)
            .then((res) => {
                setUser(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [params.userId]);

    return (
        <div className='single'>
            <Sidebar />
            <div className='singleContainer'>
                <Navbar />
                <div className='top'>
                    <div className='left'>
                        {Object.keys(user).length ? (
                            <Fragment>
                                <div className='editButton'>Edit</div>
                                <h1 className='title'>Information</h1>
                                <div className='item'>
                                    <img
                                        src={`http://localhost:4000/${user.image.url}`}
                                        alt={user.name}
                                        className='itemImg'
                                    />
                                    <div className='details'>
                                        <h1 className='itemTitle'>
                                            {user.name}
                                        </h1>
                                        <div className='detailItem'>
                                            <span className='itemKey'>
                                                Email:
                                            </span>
                                            <span className='itemValue'>
                                                {user.email}
                                            </span>
                                        </div>
                                        <div className='detailItem'>
                                            <span className='itemKey'>
                                                Phone:
                                            </span>
                                            <span className='itemValue'>
                                                {user.phone}
                                            </span>
                                        </div>
                                        <div className='detailItem'>
                                            <span className='itemKey'>
                                                Address:
                                            </span>
                                            <span className='itemValue'>
                                                {user.address}
                                            </span>
                                        </div>
                                        <div className='detailItem'>
                                            <span className='itemKey'>
                                                Country:
                                            </span>
                                            <span className='itemValue'>
                                                {user.country}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        ) : null}
                    </div>

                    <div className='right'>
                        <Chart
                            aspect={3 / 1}
                            title='User Spending ( Last 6 Months)'
                        />
                    </div>
                </div>
                <div className='bottom'>
                    <h1 className='title'>Last Transactions</h1>
                    <List />
                </div>
            </div>
        </div>
    );
};

export default Single;
