import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
} from 'react-router-dom';
import Home from './pages/home/Home';
import UserList from './pages/list/UserList';
import Login from './pages/login/Login';
import New from './pages/new/New';
import Single from './pages/single/Single';

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/'>
                <Route index element={<Home />}></Route>/
                <Route path='/login' element={<Login />}></Route>
                <Route path='/user'>
                    <Route index element={<UserList />}></Route>
                    <Route path=':userId' element={<Single />}></Route>
                    <Route path='new' element={<New />}></Route>
                </Route>
            </Route>
        )
    );
    return (
        <div className='App'>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
