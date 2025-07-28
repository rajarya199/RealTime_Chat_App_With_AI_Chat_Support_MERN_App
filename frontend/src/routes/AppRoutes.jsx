import React from 'react'
import { Route,BrowserRouter,Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import Layout from '../layout/Layout'
import CreateProj from '../pages/CreateProj'
import Project from '../pages/Project'
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
   <Route index element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/myProject' element={<CreateProj/>}/>
        <Route path='/project/:id' element={<Project/>}/>
        </Route>
     
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
