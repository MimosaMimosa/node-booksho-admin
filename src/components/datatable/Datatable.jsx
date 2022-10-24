import './datatable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from '../../datatablesource';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';

const Datatable = () => {
    const [data, setData] = useState(userRows);
    const [limit, setLimit] = useState(10);
    const [user, setUser] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const handleChange = (e) => {
        setLimit(e.target.value);
        setSearchParams({ limit: e.target.value });
    };

    useEffect(() => {
        let search = `http://localhost:4000/api/v1/users${location.search}`;
        axios
            .get(search)
            .then((res) => {
                setUser(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [location.pathname, limit, location.search]);

    const actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className='cellAction'>
                        <Link
                            to='/users/test'
                            style={{ textDecoration: 'none' }}
                        >
                            <div className='viewButton'>View</div>
                        </Link>
                        <div
                            className='deleteButton'
                            onClick={() => handleDelete(params.row.id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];
    return (
        <Fragment>
            <div className='datatable'>
                <Grid display='flex' alignItems='center' justifyContent='end'>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
                        <InputLabel id='demo-simple-select-label'>
                            Limit
                        </InputLabel>
                        <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            label='Age'
                            value={limit}
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select>
                    </FormControl>
                    <Link to='/users/new' style={{ textDecoration: 'none' }}>
                        <Button variant='outlined' color='success'>
                            Add New
                        </Button>
                    </Link>
                </Grid>
                <DataGrid
                    className='datagrid'
                    rows={data}
                    columns={userColumns.concat(actionColumn)}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    checkboxSelection
                />
            </div>
        </Fragment>
    );
};

export default Datatable;
