import React from 'react';
import './App.css';
import { Menu } from './components/menu/menu';
import { Main } from './pages/main/main';
import { Lessons } from './pages/lessons/lessons';
import { Routes, Route } from 'react-router-dom';
import Profile from './pages/profile/profile';
import { PianoPage } from './pages/pianoPage/pianoPage';
import { LessonPage } from './pages/lessonPage/lessonPage';
import { Auth } from './pages/auth/auth';

function App() {
  return (
    <>
      <div className='wrapper'>
        <Menu />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/piano' element={<PianoPage />} />
            <Route path='/lessons' element={<Lessons />} />
            <Route path='/auth' element={<Auth/>} />
            <Route path='/lesson/:id' element={<LessonPage />} />
            <Route path='/profile' element={<Profile session={0}/>} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;