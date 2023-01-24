import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import "./Login.css"

const Login = (props) => {
  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("")
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    //handle submit
    let data = new FormData()
    data.append("username", username)
    data.append("password", pass)

    var config = {
      method: "post",
      url: "http://127.0.0.1:8000/api/login",
      // headers: {
      //   ...data.getHeaders(),
      // },
      data: data,
    }

    await axios(config)
      .then(function (response) {
        console.log(response.status)
        console.log(response.data)
        console.log(response.data.user)
        if (response.status === 200) {
          let bigToken = response.data.access_token
          let tokenParts = bigToken.split("|")
          let token = tokenParts[1]
          sessionStorage.setItem("auth_key", token)
          console.log(token)
          sessionStorage.setItem("logged_user", JSON.stringify(response.data.user))
          let profilePictureAPI = "https://api.multiavatar.com/" + response.data.user["username"] + ".png"
          sessionStorage.setItem("profile_image", profilePictureAPI)
          navigate("/")
        }
      })
      .catch(function (error) {
        console.log(error)
        alert(error.message)
      })
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
            onChange={(e) => setUsername(e.target.value)}
            type="text"
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
