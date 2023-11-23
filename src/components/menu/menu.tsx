import './menu.css';
import { Link, Outlet } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

export function Menu() {
    return (
        <>
        <div id="menu-container">
            <div id="left">
                <Link to="/"><img src={supabase.storage.from("images").getPublicUrl(`logo.png`).data.publicUrl} alt='logo'></img></Link>
                <Link to="/piano"><button>Piano</button></Link>
                <Link to="/lessons" onClick={() => {localStorage.setItem('practiceMode', "false")}}><button>Lessons</button></Link>
            </div>
            <Link to="/profile"><button>Profile</button></Link>
        </div>
        <Outlet />
        </>
    )
}