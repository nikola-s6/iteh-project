import React, { useState } from "react"
import Comment from "./Comment"

function CommentList({ deleteComment, comments, updateComment }) {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <>
          <Comment deleteComment={deleteComment} key={comment.id} comment={comment} updateComment={updateComment} />
          <br />
          <br />
        </>
      ))}
    </div>
  )
}

export default CommentList
