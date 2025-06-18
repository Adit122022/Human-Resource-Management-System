import React from 'react'
 import { BrowserRouter as Router  , Routes,Route} from 'react-router-dom'
import AuthForm from '../Auth/AuthForm'
import HeroSection from '../Pages/HeroSection'

const AppRouter = () => {
  return (
   <>
<Router>
<Routes>
    <Route path='/' element ={<HeroSection/>}/>
    <Route path='/auth' element={<AuthForm/>}/>
</Routes>
</Router>
   </>
  )
}

export default AppRouter