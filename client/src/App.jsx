import React from 'react'
import AuthForm from './Auth/AuthForm'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import AppRouter from './Routes/AppRouter'

const App = () => {
  return (
    <div>
      <Navbar/>
      
<AppRouter/>
 
<Footer/>
    </div>
  )
}

export default App