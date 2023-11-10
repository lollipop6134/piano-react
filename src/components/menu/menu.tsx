import './menu.css';
import { Link, Outlet } from 'react-router-dom';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://lxbcgtsajrvcgbuyizck.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4YmNndHNhanJ2Y2didXlpemNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1MTkwNTcsImV4cCI6MjAxNTA5NTA1N30.Ey3PDIXgcVqGtU1GAWCPMAKuDgLOC7BhtajQ_bHV5NI");


export function Menu() {
    return (
        <>
        <div id="menu-container">
            <div id="left">
                <Link to="/"><img src={supabase.storage.from("images").getPublicUrl(`logo.png`).data.publicUrl} alt='logo'></img></Link>
                <Link to="/piano"><button>Piano</button></Link>
                <Link to="/lessons" onClick={() => {localStorage.setItem('practiceMode', "false")}}><button>Lessons</button></Link>
            </div>
            <Link to="/auth"><button>Sign Up</button></Link>
        </div>
        <Outlet />
        </>
    )
}