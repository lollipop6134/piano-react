import React from 'react';
import './App.css';
import { Menu } from './components/menu/menu';
import { Main } from './components/main/main';
import { Footer } from './components/footer/footer';

function App() {
  return (
    <div>
      <Menu />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
