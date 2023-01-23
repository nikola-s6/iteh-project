import Post from "../../components/Post"
import "./Home.css"
import React, { useEffect, useState } from "react"
import PostList from "../../components/PostList"
import axios from "axios"

function Home() {
  const [posts, setPosts] = useState({})

  useEffect(() => {
    async function fetchData() {
      console.log("usao")
      const response = await getPosts()
      setPosts(response.data.data)
      console.log(response.data.data)
    }
    fetchData()
  }, [])

  return (
    <div className="posts">
      <PostList posts={posts} showDelete={false} />

      {/* <h1>nesto se desava</h1> */}
    </div>
  )
}
/*
async function getPosts() {
  var config = {
    method: "get",
    url: "http://127.0.0.1:8000/api/post",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("auth_key"),
    },
  }

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data))
    })
    .catch(function (error) {
      console.log(error)
    })
}

export default Home
