import React from "react"
import { Avatar, Button, Card } from "antd"

function Comment({ comment, avatar }) {
  return (
    <div className="comment">
      <div className="comment-header">
        <Card.Meta avatar={<Avatar src={avatar} />} title={comment.name} style={{ display: "flex", gap: "30%" }} />
      </div>
      <p className="comment-text">{comment.text}</p>
      <span className="comment-date" style={{ fontSize: "10px" }}>
        {comment.date}
      </span>
    </div>
  )
}

export default Comment
