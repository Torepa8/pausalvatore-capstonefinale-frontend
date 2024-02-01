import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavComponent from './component/Nav/Nav.jsx';
import Main from './component/Main/Main.jsx';
import Search from './component/Search/search.jsx';
import { useState } from 'react';


function App() {
  const [search, setSearch] = useState('');
  return(
  <>
    
    <NavComponent />
    <Search setSearch={setSearch} search={search}/>
    <Main search={search} />

  </>
)}

export default App;
