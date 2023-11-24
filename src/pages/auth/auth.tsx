import { Footer } from '../../components/footer/footer';
import './auth.css';
import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useEffect } from 'react';

interface User {
    id: number;
    username: string;
    email: string;
    completedLessons: number[];
    password: string;
}

export function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getUsers();
    }, [])

    async function getUsers() {
        const { data } = await supabase.from("Users").select();
        setUsers(data || []);
    }

    async function addUserToSupabase() {
        try {
            const { data, error } = await supabase.from(`Users`).insert([
                {
                    username: username,
                    email: email,
                    password: password,
                    completedLessons: []
                }
            ]);

            if (error) {
                console.error('Ошибка при добавлении пользователя:', error.message);
            } else {
                console.log('Пользователь успешно добавлен:', data);
                getUsers();
            }
        } catch (error) {
            console.error('Ошибка при добавлении пользователя:', error);
        }
    }

    function handleAddUserClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        addUserToSupabase();
    }

    return (
        <>
            <img src={supabase.storage.from("images").getPublicUrl(`Vector5.png`).data.publicUrl} alt="vector 5" className='vector' id="formVector"/>
            <form>
                <p>Sign Up</p>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <span>Email</span>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <span>Password</span>
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <span>Username</span>
                <button type='submit' onClick={handleAddUserClick}>Let's Go!</button>
            </form>
            <div id="formButtons">
                    <button id="signUpButton">Sign up</button>
                    <button id="logInButton">Log in</button>
            </div>
            <Footer />
        </>
    )
}