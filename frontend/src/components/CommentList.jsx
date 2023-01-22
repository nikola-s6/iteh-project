import React from "react"
import Comment from "./Comment"

function CommentList({ comments, avatar }) {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <>
          <Comment key={comment.id} comment={comment} avatar={avatar} />
          <br />
          <br />
        </>
      ))}
    </div>
  )
}

export default CommentList
