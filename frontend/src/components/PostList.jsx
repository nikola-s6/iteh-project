import React from "react"
import Post from "./Post"

function PostList({ posts, handleDelete }) {
  // function isUserPost(postCreator, userId) {
  //   if (postCreator == userId) return true
  //   return false
  // }

  return (
    <section className="postlist">
      <div className="container">
        <div className="postlist-content grid">
          {posts.map((item) => {
            return <Post post={item} key={item.id} handleDelete={handleDelete} />
          })}
        </div>
      </div>
    </section>
  )
}

export default PostList
