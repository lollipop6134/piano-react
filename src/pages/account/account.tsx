import { Footer } from '../../components/footer/footer';
import './account.css';
import { useState } from 'react';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://lxbcgtsajrvcgbuyizck.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4YmNndHNhanJ2Y2didXlpemNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1MTkwNTcsImV4cCI6MjAxNTA5NTA1N30.Ey3PDIXgcVqGtU1GAWCPMAKuDgLOC7BhtajQ_bHV5NI");


export function Account() {
    
    const [login, setLogin] = useState('logIn');

    function signUpButton() {
        setLogin('signUp');
    }
    
    function logInButton() {
        setLogin('logIn');
    }

    return (
        <>
            <img src={supabase.storage.from("images").getPublicUrl(`Vector5.png`).data.publicUrl} alt="vector 5" className='vector' id="formVector"/>
            <form>
                <p>{login === 'logIn' ? 'Log In' : 'Sign Up'}</p>
                <input />
                <span>Username</span>
                <input type="password" />
                <span>Password</span>
                <button type="submit">Let's Go!</button>
            </form>
            <div id="formButtons">
                    <button onClick={signUpButton} id="signUpButton">Sign up</button>
                    <button onClick={logInButton} id="logInButton">Log in</button>
            </div>
            <Footer />
        </>
    )
}