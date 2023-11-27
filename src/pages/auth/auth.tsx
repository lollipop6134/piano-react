import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import { Footer } from '../../components/footer/footer';
import "./auth.css";

interface User {
    id: number;
    username: string;
    email: string;
    completedLessons: number[];
}

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSignUp = async (event: any) => {
    event.preventDefault()

    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Check your email for the login link!')
      const { error } = await supabase.from(`Users`).insert([
        {
            username: username,
            email: email,
            completedLessons: []
        }
      ])
      if (error) {
        alert(error.message)
      }
    }
    setLoading(false)
  }

  const handleSignIn = async (event: any) => {
    event.preventDefault()

    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      alert(error.message)
    }
  }

  return (
    <>
        <img src={supabase.storage.from("images").getPublicUrl(`Vector5.png`).data.publicUrl} alt="vector 5" className='vector' id="formVector"/>
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
            <input
              type="password"
              placeholder="Your password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={loading}>
              {loading ? <span>Loading</span> : isSignUp ? "Send magic link" : "Sign In"}
            </button>
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