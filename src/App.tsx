import React from 'react';
import './App.css';
import { Menu } from './components/menu/menu';
import { Main } from './components/main/main';
import { Footer } from './components/footer/footer';
import { Lessons } from './components/lessons/lessons';
import { Routes, Route } from 'react-router-dom';
import { Account } from './components/account/account';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Menu/>}>
          <Route path='/' element={<Main />} />
          <Route path='/piano' element={<Main />} />
          <Route path='/lessons' element={<Lessons />} />
          <Route path='/account' element={<Account />} />
        </Route>
        
      </Routes>
    </>
    
  );
}

export default App;
