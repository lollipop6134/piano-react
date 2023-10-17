import './menu.css';
import { Link, Outlet } from 'react-router-dom';

export function Menu() {
    return (
        <>
        <div id="menu-container">
            <div id="left">
                <Link to="/"><img src="/images/logo.png" alt='logo'></img></Link>
                <Link to="/piano"><button>Piano</button></Link>
                <Link to="/lessons"><button>Lessons</button></Link>
            </div>
            <Link to="/auth"><button>Sign Up</button></Link>
        </div>
        <Outlet />
        </>
    )
}