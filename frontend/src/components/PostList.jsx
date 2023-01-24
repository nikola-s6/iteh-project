import React from "react"
import Post from "./Post"

function PostList({ posts, handleDelete }) {
  // function isUserPost(postCreator, userId) {
  //   if (postCreator == userId) return true
  //   return false
  // }

  function deleteCommentFromPost(idComment, idPost) {
    posts.forEach((element) => {
      if (element.id === idPost) {
        let list = element.comments.filter((comment) => comment.id != idComment)
        element.comments = list
      }
    })
  }

  return (
    <section className="postlist">
      <div className="container">
        <div className="postlist-content grid">
          {posts.map((item) => {
            return (
              <Post
                deleteCommentFromPost={deleteCommentFromPost}
                post={item}
                key={item.id}
                handleDelete={handleDelete}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PostList
