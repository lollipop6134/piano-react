import { Footer } from '../../components/footer/footer';
import './account.css';
import { useState } from 'react';

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
            <img src="/images/Vector5.png" alt="vector 5" className='vector' id="formVector"/>
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