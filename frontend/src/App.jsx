import { BrowserRouter , Routes , Route} from "react-router-dom";
import Analytics from './pages/Analytics'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Focus from './pages/Focus'
import Notes from './pages/Notes'
import Signup from './pages/Signup'
import Tasks from './pages/Tasks'


function App(){
  return (
  <div>
    <BrowserRouter>
      <Routes> 
        <Route path="login" element={<Login />}/>
        <Route path="signup" element={<Signup />}/>
        <Route path="tasks" element={<Tasks />}/>
        <Route path="focus" element={<Focus />}/>
        <Route path="analytics" element={<Analytics />}/>
        <Route path="dashboard" element={<Dashboard />}/>
        <Route path="notes" element={<Notes/>}/>
        </Routes>
    </BrowserRouter>
  </div>
  )
}
export default App