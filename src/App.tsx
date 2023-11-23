import React, {useEffect, useState} from 'react';
import './App.css';
import { Menu } from './components/menu/menu';
import { Main } from './pages/main/main';
import { Lessons } from './pages/lessons/lessons';
import { Routes, Route } from 'react-router-dom';
import Profile from './pages/profile/profile';
import { PianoPage } from './pages/pianoPage/pianoPage';
import { LessonPage } from './pages/lessonPage/lessonPage';
import { Auth } from './pages/auth/auth';
import { supabase } from './supabaseClient';

function App() {
  const [session, setSession] = useState<any>(null)

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
            <Route path='/lessons' element={<Lessons />} />
            <Route path='/lesson/:id' element={<LessonPage />} />
            <Route path='/profile' element={!session ? <Auth /> : <Profile session={session} key={session.user.id}/>} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;