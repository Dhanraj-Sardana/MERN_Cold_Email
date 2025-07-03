import HomePage from "./pages/Home"
import NavBar from "./components/NavBar"
import { Routes, Route } from 'react-router-dom'
import Signin from "./pages/Signin"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import EditCampaign from "./pages/EditCampaign"
import GenAiPrompt from "./pages/GenAi"
import Logout from "./pages/Logout"
import SendEmail from "./pages/SendEmail"
function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<HomePage />}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/edit/:id" element={<EditCampaign />} />
        <Route path="/genAiPrompt" element={<GenAiPrompt />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/email" element={<SendEmail />} />
        
      </Routes>
    </>
  )
}

export default App
