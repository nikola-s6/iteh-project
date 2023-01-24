import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Register = (props) => {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [repeatPass, setRepeatPass] = useState("")
  const [name, setName] = useState("")
  const [userName, setUserName] = useState("")
  let navigate = useNavigate()

  function changePageToLogin() {
    navigate("/login")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let data = new FormData()
    data.append("name", name)
    data.append("username", userName)
    data.append("email", email)
    data.append("password_check", repeatPass)
    data.append("password", pass)

    var config = {
      method: "post",
      url: "http://127.0.0.1:8000/api/register",
      data: data,
    }
    await axios(config)
      .then(function (response) {
        if (response.status === 200) {
          alert("Success")
          navigate("/login")
        }
      })
      .catch(function (error) {
        console.log(error)
        alert(error.message)
      })
  }

  return (
    <div className="register">
      <div className="auth-form-container">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Enter your name" />
          <label htmlFor="username">Username</label>
          <input
            name="username"
            onChange={(e) => setUserName(e.target.value)}
            id="username"
            placeholder="Enter your username"
          />
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="someone@gmail.com"
            id="email"
            name="email"
          />
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          <label htmlFor="password">Repeat password</label>
          <input
            onChange={(e) => setRepeatPass(e.target.value)}
            type="password"
            placeholder="********"
            id="repeatPassword"
            name="repeatPassword"
          />
          <button onClick={handleSubmit} type="submit">
            Register
          </button>
        </form>
        <button className="link-btn" onClick={changePageToLogin}>
          Already have an account? Login here.
        </button>
      </div>
    </div>
  )
}

export default Register
