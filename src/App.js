import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavComponent from './component/Nav/Nav.jsx';
import Main from './component/Main/Main.jsx';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './component/Login/Register';
import Login from './component/Login/Login';
import UserLog from './context/UserLog.jsx';
import Admin from './component/Admin/Admin.jsx';
import Offer from './component/Main/Offer.jsx';
import Service from './component/Main/Service.jsx';
import Footer from './component/Footer/Footer.jsx';

function App() {
  const [search, setSearch] = useState('');
  const [userLog, setUserLog] = useState(localStorage.getItem('name') !== null ? true : false)

  return (
    <>
      <UserLog.Provider value={{ userLog, setUserLog }}>
        <NavComponent userLog={userLog} setUserLog={setUserLog} />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Main search={search} setSearch={setSearch} />} />
            <Route path='/offer' element={<Offer search={search} setSearch={setSearch} />} />
            <Route path='/service' element={<Service search={search} setSearch={setSearch} />} />
            <Route path='/contact' element={<h1>Contact</h1>} />
            {/* <Route path='/about' element={<About } /> */}
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login userLog={userLog} setUserLog={setUserLog} />} />
            <Route path='/admin' element={<Admin />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </BrowserRouter >
        <Footer />
      </UserLog.Provider>
    </>
  )
}

export default App;