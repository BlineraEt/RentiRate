import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './elements/Home';
import Create from './elements/Create';
import Edit from './elements/Edit';
import Read from './elements/Read';
import Login from './login';
import HomeAdmin from './elementsAdmin/HomeAdmin';
import CreateAdmin from './elementsAdmin/CreateAdmin';
import EditAdmin from './elementsAdmin/EditAdmin';
import ReadAdmin from './elementsAdmin/ReadAdmin';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element = {<Login />}/>
        <Route path='/' element = {<Home />} />
        <Route path='/create' element = {<Create />} />
        <Route path='/edit/:id' element = {<Edit />} />
        <Route path='/read/:id' element = {<Read />} />
        <Route path='/homeAdmin' element = {<HomeAdmin />} />
        <Route path='/createAdmin' element = {<CreateAdmin />} />
        <Route path='/editAdmin/:id' element = {<EditAdmin />} />
        <Route path='/readAdmin/:id' element = {<ReadAdmin />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App