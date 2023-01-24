import React, { useState } from "react"
import Comment from "./Comment"

function CommentList({ deleteComment, comments }) {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <>
          <Comment deleteComment={deleteComment} key={comment.id} comment={comment} />
          <br />
          <br />
        </>
      ))}
    </div>
  )
}

export default CommentList
