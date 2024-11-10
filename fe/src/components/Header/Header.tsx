import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

function Header() {


    return (
        <>
            <header >
                <Navbar />
            </header>
            <Outlet />
        </>
    );
}

export default Header;