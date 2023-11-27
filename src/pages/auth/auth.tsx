// import { Footer } from '../../components/footer/footer';
// import './auth.css';
// import { useState } from 'react';
// import { supabase } from '../../supabaseClient';
// import { useEffect } from 'react';

// interface User {
//     id: number;
//     username: string;
//     email: string;
//     completedLessons: number[];
//     password: string;
// }

// export function Auth() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [username, setUsername] = useState('');
//     const [users, setUsers] = useState<User[]>([]);
//     const [isError, setIsError] = useState(false);
//     const [error, setError] = useState('')

//     useEffect(() => {
//         getUsers();
//     }, [])

//     async function getUsers() {
//         const { data } = await supabase.from("Users").select();
//         setUsers(data || []);
//     }

//     async function addUserToSupabase() {

//         const { data, error } = await supabase.from(`Users`).insert([
//             {
//                 username: username,
//                 email: email,
//                 password: password,
//                 completedLessons: []
//             }
//         ]);

//         if (error) {
//             console.error('Ошибка при добавлении пользователя:', error.message);
//             setIsError(true);
//             setError(error.message);
//         } else {
//             console.log('Пользователь успешно добавлен:', data);
//             getUsers();
//         }
//     }

//     function handleAddUserClick(e: React.MouseEvent<HTMLButtonElement>) {
//         e.preventDefault();
//         addUserToSupabase();
//     }

//     return (
//         <>
//             <img src={supabase.storage.from("images").getPublicUrl(`Vector5.png`).data.publicUrl} alt="vector 5" className='vector' id="formVector"/>
//             <form>
//                 <p>Sign Up</p>
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <span>Email</span>
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <span>Password</span>
//                 <input 
//                     type="text"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <span>Username</span>
//                 <button type='submit' onClick={handleAddUserClick}>Let's Go!</button>
//             </form>
//             <div id="formButtons">
//                     <button id="signUpButton">Sign up</button>
//                     <button id="logInButton">Log in</button>
//             </div>
//             {isError && <div id='modal'>
//                 <div id='modalMessage'>
//                     {error}
//                     <button onClick={() => setIsError(false)}>Okay</button>
//                 </div>
//             </div>}
//             <Footer />
//         </>
//     )
// }

import { useState } from 'react'
import { supabase } from '../../supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
    }
    setLoading(false)
  }

  const handleSignIn = async (event: any) => {
    event.preventDefault()

    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      alert(error.message)
    }
  }

  return (
    <div>
      <div>
        <h1>Supabase + React</h1>
        <p>Sign in via magic link with your email below</p>
        <form onSubmit={handleSignUp}>
          <div>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Your password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button disabled={loading}>
              {loading ? <span>Loading</span> : <span>Send magic link</span>}
            </button>
          </div>
        </form>


        <form onSubmit={handleSignIn}>
          <div>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Your password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button disabled={loading}>
              {loading ? <span>Loading</span> : <span>Sign In</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}