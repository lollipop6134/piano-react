import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import { Footer } from '../../components/footer/footer';
import "./auth.css";

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [isHidePassword, setIsHidePassword] = useState(true)

  const handleSignUp = async (event: any) => {
    event.preventDefault()

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      alert(error.message)
    } else {
      const { error } = await supabase.from(`Users`).insert([
        {
            username: username,
            email: email,
            completedLessons: []
        }
      ])
      if (error) {
        alert(error.message)
      } else {
        alert('Check your email for the login link!')
      }
    }
  }

  const handleSignIn = async (event: any) => {
    event.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      alert(error.message)
    }
  }

  const handleChangePassword = async (event: any) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://piano-react-lollipop.vercel.app/account"
    })
    if (error) {
      alert(error.message)
    } else {
      alert("Check Email!")
    }
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        const newPassword = prompt("What would you like your new password to be?");
        if (newPassword !== null) {
          const { error } = await supabase.auth.updateUser({ password: newPassword });
  
          if (error) {
            alert("There was an error updating your password.");
          }
        }
      }
    });
  }, []);

  return (
    <>
        <img src='/images/Vector5.png' alt="vector 5" className='vector' id="formVector"/>
        <form onSubmit={ isSignUp ? handleSignUp : handleSignIn}>
            <div className="header">Sign {isSignUp ? "Up" : "In"}</div>
            <div id='inputs'>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            {isSignUp && <input
              type="text"
              placeholder="Create username"
              value={username}
              required={true}
              onChange={(e) => setUsername(e.target.value)}
            />}
            <div>
              <input
                type= {isHidePassword ? "password" : "text"}
                placeholder="Your password"
                value={password}
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src={`images/${(isHidePassword ? 'eye.webp' : 'hide.webp')}`}
                alt='show/hide password' id='eye'
                onClick={() => {setIsHidePassword(!isHidePassword)}}/>
            </div>
            { !isSignUp && <div id='changePassword' onClick={handleChangePassword}>Forgot password?</div> }
            <button> {isSignUp ? "Send magic link" : "Sign In"} </button>
            </div>
        </form>
        <div id="formButtons">
            <button id="signUpButton" onClick={() => setIsSignUp(true)}>Sign up</button>
            <button id="logInButton" onClick={() => setIsSignUp(false)}>Sign in</button>
        </div>
        <div className='bottom'>
            <Footer />
        </div>
    </>
  )
}