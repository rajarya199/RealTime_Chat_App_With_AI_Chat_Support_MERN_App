import React from 'react'
import { UserProvider } from './context/user.provider'
import AppRoutes from './routes/AppRoutes'
const App = () => {
  return (
    <UserProvider>
      <AppRoutes/>
    </UserProvider>
  )
}

export default App
