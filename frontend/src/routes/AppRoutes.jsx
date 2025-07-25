import React from 'react'
import { Route,BrowserRouter,Routes } from 'react-router-dom'
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"element={<>home</>}/>
        <Route path="/login" element={<>login</>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
