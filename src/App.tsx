import React from 'react';
import './App.css';
import { Menu } from './components/menu/menu';
import { Main } from './pages/main/main';
import { Lessons } from './pages/lessons/lessons';
import { Routes, Route } from 'react-router-dom';
import { Account } from './pages/account/account';
import { PianoPage } from './pages/pianoPage/pianoPage';
import { LessonPage } from './pages/lessonPage/lessonPage';

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
            <Route path='/auth' element={<Account />} />
            <Route path='/lesson/:id' element={<LessonPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;