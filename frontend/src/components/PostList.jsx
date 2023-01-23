import React from "react"
import Post from "./Post"

function PostList({ posts, showDelete }) {
  function isUserPost(postCreator, userId) {
    if (postCreator == userId) return true
    return false
  }

  return (
    <section className="postlist">
      <div className="container">
        <div className="postlist-content grid">
          {posts.map((item) => {
            return (
              <Post
                created_at={item.created_at}
                avatar={sessionStorage.getItem("profile_image")}
                username={item.username}
                caption={item.body}
                showDelete={showDelete}
                isUserPost={isUserPost}
                key={item.id}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PostList
