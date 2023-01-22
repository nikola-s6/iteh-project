import Post from "../../components/Post"
import "./Home.css"
import React, { useState } from "react"
import PostList from "../../components/PostList"

function Home() {
  const [posts, setPosts] = useState([
    {
      created_at: "12-03-2000",
      avatar: "https://example.com/avatar.jpg",
      username: "Name",
      caption:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, nemo sequi. Similique necessitatibus atque sit, magnam voluptatum corrupti ad ratione ex reprehenderit corporis velit omnis libero aspernatur iure, culpa dicta!",
    },
    {
      created_at: "12-03-2000",
      avatar: "https://example.com/avatar.jpg",
      username: "Name",
      caption:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, nemo sequi. Similique necessitatibus atque sit, magnam voluptatum corrupti ad ratione ex reprehenderit corporis velit omnis libero aspernatur iure, culpa dicta!",
    },
  ])

  return (
    <div className="posts">
      <PostList posts={posts} showDelete={false} />
    </div>
  )
}

export default Home
