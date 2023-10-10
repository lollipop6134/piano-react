import React from 'react';
import './App.css';
import { Menu } from './components/menu/menu';
import { Main } from './components/main/main';
import { Lessons } from './components/lessons/lessons';
import { Routes, Route } from 'react-router-dom';
import { Account } from './components/account/account';
import { Footer } from './components/footer/footer';
import { Piano } from './components/piano/piano';

function App() {
  return (
    <>
      <div className='wrapper'>
        <Menu />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/piano' element={<Piano />} />
            <Route path='/lessons' element={<Lessons />} />
            <Route path='/account' element={<Account />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
