import React, {useEffect, useState} from 'react';
import './App.css';
import { Menu } from './components/menu/menu';
import { Main } from './pages/main/main';
import { Lessons } from './pages/lessons/lessons';
import { Routes, Route } from 'react-router-dom';
import { PianoPage } from './pages/pianoPage/pianoPage';
import { LessonPage } from './pages/lessonPage/lessonPage';
import Auth from './pages/auth/auth';
import { supabase } from './supabaseClient';
import Account from './pages/account/account';

interface SessionData {
  user: {
    id: string;
  }
}

function App() {
  const [session, setSession] = useState<SessionData | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <>
      <div className='wrapper'>
        <Menu />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/piano' element={<PianoPage />} />
            <Route path='/lessons' element={<Lessons key={session?.user.id} session={session}/>} />
            <Route path='/lesson/:id' element={ session !== null ? <LessonPage session={session}/> : ''} />
            <Route path='/account' element={ !session ? <Auth /> : <Account key={session.user.id} session={session} />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;