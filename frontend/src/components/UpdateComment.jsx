import { React, useState } from "react"
import { Avatar, Button, Card } from "antd"

function UpdateComment({ comment, setCommentText }) {
  return (
    <div>
      <Card.Meta
        avatar={
          <img
            src={`https://api.multiavatar.com/${comment.user.username}.png`}
            style={{ borderRadius: "50%", width: "30px", height: "30px" }}
          />
        }
        title={comment.user.username}
        style={{ display: "flex", gap: "5%" }}
      />

      <br />
      <textarea onChange={(e) => setCommentText} rows="6" style={{ width: "100%", height: "100%" }}>
        {comment.text}
      </textarea>
      <br />
      <button className="button">Update</button>
    </div>
  )
}

export default UpdateComment
