import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { Link } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className='top'>
                <span className='logo'>lama admin </span>
            </div>
            <hr />
            <div className='center'>
                <ul>
                    <p className='title'>MAIN</p>
                    <li>
                        <DashboardIcon className='icon' />
                        <span>Dashboard</span>
                    </li>
                    <p className='title'>LISTS</p>
                    <Link to='/users' style={{ textDecoration: 'none' }}>
                        <li>
                            <PersonOutlineRoundedIcon className='icon' />
                            <span>Users</span>
                        </li>
                    </Link>
                    <Link to='/products' style={{ textDecoration: 'none' }}>
                        <li>
                            <StoreMallDirectoryIcon className='icon' />
                            <span>Products</span>
                        </li>
                    </Link>
                    <li>
                        <CreditCardIcon className='icon' />
                        <span>Orders</span>
                    </li>
                    <li>
                        <LocalShippingIcon className='icon' />
                        <span>Delivery</span>
                    </li>
                    <p className='title'>USEFUL</p>
                    <li>
                        <LeaderboardIcon className='icon' />
                        <span>Stats</span>
                    </li>
                    <li>
                        <NotificationsNoneIcon className='icon' />
                        <span>Notifications</span>
                    </li>
                    <p className='title'>SERVICE</p>
                    <li>
                        <SettingsSystemDaydreamIcon className='icon' />
                        <span>System Health</span>
                    </li>
                    <li>
                        <PsychologyIcon className='icon' />
                        <span>Logs</span>
                    </li>
                    <li>
                        <SettingsSuggestIcon className='icon' />
                        <span>Settings</span>
                    </li>
                    <p className='title'>USER</p>
                    <li>
                        <AccountCircleIcon className='icon' />
                        <span>Profile</span>
                    </li>
                    <li>
                        <LogoutIcon className='icon' />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            <div className='bottom'>
                <div className='colorOption'></div>
                <div className='colorOption'></div>
            </div>
        </div>
    );
};

export default Sidebar;
