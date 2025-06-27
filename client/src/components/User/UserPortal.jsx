import React from 'react'
import Navbar from '../Navbar'
import {Routes, Route } from "react-router-dom";
import Home from '../Home';
import Books from '../Books';
import Readbook from "../Readbook";
// import AddToCart from './AddToCart';
import Cart from '../Carts';

const UserPortal = () => {
  return (
    <>
<Navbar />

      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<Books />} path='/books' />
        <Route element={<Readbook />} path='/readbooks/:id' />
        <Route element={<Cart />} path='/carts' />
      </Routes>
    </>
  )
}

export default UserPortal
