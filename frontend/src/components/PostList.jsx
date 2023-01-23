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
            let avatar = `https://api.multiavatar.com/${item.username}`
            return (
              <Post
                created_at="12-03-2000"
                avatar={avatar}
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
