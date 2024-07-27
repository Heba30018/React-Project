
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginPage from './components/LoginPage'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
function App() {

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/adminlogin' element={<LoginPage/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
