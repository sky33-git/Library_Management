import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import AdminPortal from './components/Admin/AdminPortal'
import UserPortal from './components/User/UserPortal'
import SignupForm from './components/SignupForm'

const App = () => {
  return (
    <>

      <BrowserRouter>

        <Routes>
          <Route element={<LandingPage />} path='/' />
          <Route element={<SignupForm />} path="/signup" />
          <Route element={<UserPortal />} path='/userportal/*' />
          <Route element={<AdminPortal />} path='/adminportal/*' />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
