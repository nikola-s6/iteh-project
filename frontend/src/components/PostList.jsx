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
          {posts.map((item, index) => {
            return (
              <Post
                created_at="12-03-2000"
                avatar={item.avatar}
                username={item.username}
                caption={item.caption}
                showDelete={showDelete}
                isUserPost={isUserPost}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PostList
