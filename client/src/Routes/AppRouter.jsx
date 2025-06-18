 import {  Routes,Route} from 'react-router-dom'
import AuthForm from '../Auth/AuthForm'
import HeroSection from '../Pages/HeroSection'

const AppRouter = () => {
  return (
  <Routes>
    <Route path='/' element ={<HeroSection/>}/>
    <Route path='/auth' element={<AuthForm/>}/>
</Routes>)

 
  
}

export default AppRouter