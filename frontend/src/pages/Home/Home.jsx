import Post from "../../components/Post"
import "./Home.css"
import React, { useEffect, useState } from "react"
import PostList from "../../components/PostList"
import axios from "axios"

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await getPosts()
      setPosts(response.data.data)
      console.log(response.data.data)
      console.log(posts)
    }
    fetchData()
  }, [])

  if (posts.length == 0) {
    return <h1>Ucitavanje</h1>
  }

  return (
    <div className="posts">
      <PostList posts={posts} />
    </div>
  )
}

async function getPosts() {
  var config = {
    method: "get",
    url: "http://127.0.0.1:8000/api/post",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("auth_key"),
    },
  }

  const response = await axios(config)
  return response
}

export default Home
