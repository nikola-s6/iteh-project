import React from "react"
import Comment from "./Comment"

function CommentList({ comments }) {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <>
          <Comment key={comment.id} comment={comment} />
          <br />
          <br />
        </>
      ))}
    </div>
  )
}

export default CommentList
