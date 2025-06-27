// import React from 'react'
import Navbar from '../Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home'
import Books from '../Books'
import Readbook from '../Readbook'
import Addbooks from './Addbooks'

const AdminPortal = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<Books />} path='/books' />
        <Route element={<Readbook />} path='/readbooks/:id' />
        <Route element={<Addbooks />} path='/addbooks' />

      </Routes>

    </>
  )
}

export default AdminPortal
