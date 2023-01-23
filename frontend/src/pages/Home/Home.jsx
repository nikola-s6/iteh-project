import Post from "../../components/Post"
import "./Home.css"
import React, { useEffect, useState } from "react"
import PostList from "../../components/PostList"
import axios from "axios"

function Home() {
  const [posts, setPosts] = useState()
  /*
  useEffect(() => {
    async function fetchData() {
      const results = await getPosts()
      setPosts(results)
    }
    fetchData()
  }, [])
*/
  return (
    <div className="posts">
      <PostList posts={posts} showDelete={false} />
    </div>
  )
}
/*
async function getPosts() {
  var config = {
    method: "get",
    url: "http://127.0.0.1:8000/api/post",
    headers: {
      Authorization: "Bearer tiXfpv0k5fsXfyXHVAjNzWyTALCqUw7EKkMofioT",
    },
  }

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data))
    })
    .catch(function (error) {
      console.log(error)
    })
}*/

export default Home
