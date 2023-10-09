import React from 'react';
import './App.css';
import { Menu } from './components/menu/menu';
import { Main } from './components/main/main';
import { Footer } from './components/footer/footer';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Menu/>}>
          <Route path='/' element={<Main />} />
          <Route path='/piano' element={<Main />} />
          <Route path='/lessons' element={<Footer />} />
          <Route path='/account' element={<Main />} />
        </Route>
        
      </Routes>
    </>
    
  );
}

export default App;
