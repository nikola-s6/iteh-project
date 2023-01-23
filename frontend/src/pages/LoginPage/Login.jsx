import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import "./Login.css"

const Login = (props) => {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  let navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    //handle submit
  }

  function changePageToRegister() {
    navigate("/register")
  }

  return (
    <div className="login">
      <div className="auth-form-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="someone@gmail.com"
            id="email"
            name="email"
          />
          <label htmlFor="password">Password</label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          <button type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={changePageToRegister}>
          Don't have an account? Register here.
        </button>
      </div>
    </div>
  )
}

export default Login
