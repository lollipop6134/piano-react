import './footer.css';
import { Link } from 'react-router-dom';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://lxbcgtsajrvcgbuyizck.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4YmNndHNhanJ2Y2didXlpemNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1MTkwNTcsImV4cCI6MjAxNTA5NTA1N30.Ey3PDIXgcVqGtU1GAWCPMAKuDgLOC7BhtajQ_bHV5NI");


export function Footer() {
    return (
        <div id="footer">
            <img src={supabase.storage.from("images").getPublicUrl(`logo.png`).data.publicUrl} alt="logo" />
            <div>2024 Kirill Tarochkin</div>
            <div id="socials">
                <Link to={"https://www.instagram.com/kirilltarochkin/"}><img src={supabase.storage.from("images").getPublicUrl(`Instagram.png`).data.publicUrl} alt="instagram" /></Link>
                <Link to={"https://t.me/krkrkrrkin"}><img src={supabase.storage.from("images").getPublicUrl(`Telegram.png`).data.publicUrl} alt="telegram" /></Link>
                <Link to={"https://www.linkedin.com/in/kirill-tarochkin-6332a328b/"}><img src={supabase.storage.from("images").getPublicUrl(`Linkedin.png`).data.publicUrl} alt="linkedin" /></Link>
            </div>
        </div>
    )
}