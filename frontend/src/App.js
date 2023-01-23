import Home from "./pages/Home/Home"
import Navbar from "./components/Navbar"
import Login from "../src/pages/LoginPage/Login"
import Register from "../src/pages/LoginPage/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserPage from "../src/pages/UserPage/UserPage"

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/user" element={<UserPage username={"neko"}></UserPage>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
