import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const Register = (props) => {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [name, setName] = useState("")
  const [userName, setUserName] = useState("")
  let navigate = useNavigate()

  function changePageToLogin() {
    navigate("/login")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //handle register
  }

  return (
    <div className="register">
      <div className="auth-form-container">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="Enter your name"
          />
          <label htmlFor="username">Username</label>
          <input
            value={userName}
            name="username"
            onChange={(e) => setUserName(e.target.value)}
            id="username"
            placeholder="Enter your username"
          />
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
          <button type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={changePageToLogin}>
          Already have an account? Login here.
        </button>
      </div>
    </div>
  )
}

export default Register
