import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './elements/Home';
import Create from './elements/Create';
import Edit from './elements/Edit';
import Read from './elements/Read';
import Login from './login';
import HomeGender from './elementsGender/HomeGender';
import CreateGender from './elementsGender/CreateGender';
import EditGender from './elementsGender/EditGender';
import ReadGender from './elementsGender/ReadGender';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element = {<Login />}/>
        <Route path='/' element = {<Home />} />
        <Route path='/create' element = {<Create />} />
        <Route path='/edit/:id' element = {<Edit />} />
        <Route path='/read/:id' element = {<Read />} />
        <Route path='/homeGender' element = {<HomeGender />} />
        <Route path='/createGender' element = {<CreateGender />} />
        <Route path='/editGender/:id' element = {<EditGender />} />
        <Route path='/readGender/:id' element = {<ReadGender />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App