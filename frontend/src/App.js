import { Login } from "./pages/LoginPage/Login"
import { Register } from "./pages/LoginPage/Register"
import React, { useState } from "react"

function App() {
  const [currentForm, setCurrentForm] = useState("login")

  const toggleForm = (formName) => {
    setCurrentForm(formName)
  }

  return (
    <div>{currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />}</div>
  )
}

export default App
