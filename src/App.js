import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavComponent from './component/Nav/Nav.jsx';
import Main from './component/Main/Main.jsx';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterB from './component/Login/RegisterBusiness.jsx';
import LoginB from './component/Login/LoginBusiness.jsx';


function App() {
  const [search, setSearch] = useState('');
  return (
    <>
      <BrowserRouter>
        <NavComponent />
        <Routes>
          <Route path='/' element={<Main search={search} setSearch={setSearch} />} />
          <Route path="/loginbusiness" element={<LoginB />} />
          <Route path="/registerbusiness" element={<RegisterB />} />
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App;