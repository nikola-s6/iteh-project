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
    }
    fetchData()
  }, [])

  if (sessionStorage.length == 0) {
    return <h1>Access denied! You have to log in first!</h1>
  }

  if (posts.length == 0) {
    return <h1>Ucitavanje</h1>
  }

  function handleDelete(id) {
    deletePost(id)
    let list = posts.filter((post) => post.id != id)
    setPosts(list)
  }

  async function deletePost(id) {
    var config = {
      method: "delete",
      url: `http://127.0.0.1:8000/api/post/${id}`,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("auth_key"),
      },
    }

    const response = await axios(config)
    return response
  }

  return (
    <div className="posts">
      <PostList posts={posts} handleDelete={handleDelete} />
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
