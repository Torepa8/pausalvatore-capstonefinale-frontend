import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavComponent from './component/Nav/Nav.jsx';
import Main from './component/Main/Main.jsx';
import Search from './component/Search/search.jsx';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/Login/Login.jsx';


function App() {
  const [search, setSearch] = useState('');
  return (
    <>
      <BrowserRouter>
        <NavComponent />
        <Routes>
          <Route path='/' element={<Search setSearch={setSearch} search={search} />} />
        </Routes>
        <Routes>
          <Route path='/' element={<Main search={search} />} />
        </Routes>
        <Routes>
          <Route path="/logincompany" element={<Login />} />
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App;